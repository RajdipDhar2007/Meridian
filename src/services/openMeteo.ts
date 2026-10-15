import type { AirQuality, CurrentConditions, DailyEntry, HourlyEntry, WeatherBundle, GeoLocation } from '@/types/weather';

const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';
const AIR_QUALITY_URL = 'https://air-quality-api.open-meteo.com/v1/air-quality';

const CACHE_TTL_MS = 5 * 60 * 1000;
const cache = new Map<string, { data: unknown; expires: number }>();

async function fetchWithRetry(url: string, attempts = 3): Promise<Response> {
  let lastError: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
      return res;
    } catch (err) {
      lastError = err;
      // Exponential backoff before the next attempt.
      await new Promise((r) => setTimeout(r, 300 * Math.pow(2, i)));
    }
  }
  throw lastError instanceof Error ? lastError : new Error('Network request failed');
}

async function cachedFetchJson<T>(url: string): Promise<T> {
  const hit = cache.get(url);
  if (hit && hit.expires > Date.now()) return hit.data as T;
  const res = await fetchWithRetry(url);
  const data = (await res.json()) as T;
  cache.set(url, { data, expires: Date.now() + CACHE_TTL_MS });
  return data;
}

function aqiCategory(aqi: number): { category: AirQuality['category']; color: string } {
  if (aqi <= 50) return { category: 'Good', color: '#2FB8AC' };
  if (aqi <= 100) return { category: 'Moderate', color: '#E8C93D' };
  if (aqi <= 150) return { category: 'Unhealthy for Sensitive', color: '#E8A33D' };
  if (aqi <= 200) return { category: 'Unhealthy', color: '#D9633D' };
  if (aqi <= 300) return { category: 'Very Unhealthy', color: '#A5487B' };
  return { category: 'Hazardous', color: '#6B1F2A' };
}

interface OpenMeteoForecastResponse {
  timezone: string;
  current: {
    time: string;
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    dew_point_2m: number;
    surface_pressure: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    wind_gusts_10m: number;
    cloud_cover: number;
    visibility: number;
    uv_index: number;
    weather_code: number;
    is_day: number;
    precipitation: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
    precipitation_probability: number[];
    wind_speed_10m: number[];
    is_day: number[];
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
    uv_index_max: number[];
    sunrise: string[];
    sunset: string[];
    wind_speed_10m_max: number[];
  };
}

interface OpenMeteoAirQualityResponse {
  current: {
    us_aqi: number;
    pm2_5: number;
    pm10: number;
    ozone: number;
  };
}

function buildForecastUrl(lat: number, lon: number): string {
  const params = new URLSearchParams({
    latitude: lat.toFixed(4),
    longitude: lon.toFixed(4),
    current: [
      'temperature_2m', 'apparent_temperature', 'relative_humidity_2m', 'dew_point_2m',
      'surface_pressure', 'wind_speed_10m', 'wind_direction_10m', 'wind_gusts_10m',
      'cloud_cover', 'visibility', 'uv_index', 'weather_code', 'is_day', 'precipitation',
    ].join(','),
    hourly: ['temperature_2m', 'weather_code', 'precipitation_probability', 'wind_speed_10m', 'is_day'].join(','),
    daily: [
      'weather_code', 'temperature_2m_max', 'temperature_2m_min', 'precipitation_probability_max',
      'uv_index_max', 'sunrise', 'sunset', 'wind_speed_10m_max',
    ].join(','),
    temperature_unit: 'celsius',
    wind_speed_unit: 'kmh',
    timezone: 'auto',
    forecast_days: '10',
  });
  return `${FORECAST_URL}?${params.toString()}`;
}

function buildAirQualityUrl(lat: number, lon: number): string {
  const params = new URLSearchParams({
    latitude: lat.toFixed(4),
    longitude: lon.toFixed(4),
    current: 'us_aqi,pm2_5,pm10,ozone',
    timezone: 'auto',
  });
  return `${AIR_QUALITY_URL}?${params.toString()}`;
}

export async function fetchWeatherBundle(location: GeoLocation): Promise<WeatherBundle> {
  const forecastUrl = buildForecastUrl(location.latitude, location.longitude);
  const aqUrl = buildAirQualityUrl(location.latitude, location.longitude);

  const [forecast, airQualityRes] = await Promise.all([
    cachedFetchJson<OpenMeteoForecastResponse>(forecastUrl),
    cachedFetchJson<OpenMeteoAirQualityResponse>(aqUrl).catch(() => null),
  ]);

  const current: CurrentConditions = {
    time: forecast.current.time,
    temperature: forecast.current.temperature_2m,
    apparentTemperature: forecast.current.apparent_temperature,
    humidity: forecast.current.relative_humidity_2m,
    dewPoint: forecast.current.dew_point_2m,
    pressure: forecast.current.surface_pressure,
    windSpeed: forecast.current.wind_speed_10m,
    windDirection: forecast.current.wind_direction_10m,
    windGusts: forecast.current.wind_gusts_10m,
    cloudCover: forecast.current.cloud_cover,
    visibility: forecast.current.visibility,
    uvIndex: forecast.current.uv_index,
    weatherCode: forecast.current.weather_code,
    isDay: forecast.current.is_day === 1,
    precipitation: forecast.current.precipitation,
  };

  const hourly: HourlyEntry[] = forecast.hourly.time.map((time, i) => ({
    time,
    temperature: forecast.hourly.temperature_2m[i],
    weatherCode: forecast.hourly.weather_code[i],
    precipitationProbability: forecast.hourly.precipitation_probability[i],
    windSpeed: forecast.hourly.wind_speed_10m[i],
    isDay: forecast.hourly.is_day[i] === 1,
  }));

  const daily: DailyEntry[] = forecast.daily.time.map((date, i) => ({
    date,
    weatherCode: forecast.daily.weather_code[i],
    tempMax: forecast.daily.temperature_2m_max[i],
    tempMin: forecast.daily.temperature_2m_min[i],
    precipitationProbability: forecast.daily.precipitation_probability_max[i],
    uvIndexMax: forecast.daily.uv_index_max[i],
    sunrise: forecast.daily.sunrise[i],
    sunset: forecast.daily.sunset[i],
    windSpeedMax: forecast.daily.wind_speed_10m_max[i],
  }));

  let airQuality: AirQuality | null = null;
  if (airQualityRes) {
    const { category, color } = aqiCategory(airQualityRes.current.us_aqi);
    airQuality = {
      aqi: Math.round(airQualityRes.current.us_aqi),
      pm2_5: airQualityRes.current.pm2_5,
      pm10: airQualityRes.current.pm10,
      ozone: airQualityRes.current.ozone,
      category,
      color,
    };
  }

  return {
    location: { ...location, timezone: forecast.timezone },
    current,
    hourly,
    daily,
    airQuality,
  };
}
