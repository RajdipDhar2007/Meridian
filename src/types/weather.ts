export interface GeoLocation {
  latitude: number;
  longitude: number;
  name: string;
  admin1?: string; // state/region
  country?: string;
  timezone?: string;
}

export interface CurrentConditions {
  time: string;
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  dewPoint: number;
  pressure: number;
  windSpeed: number;
  windDirection: number;
  windGusts: number;
  cloudCover: number;
  visibility: number;
  uvIndex: number;
  weatherCode: number;
  isDay: boolean;
  precipitation: number;
}

export interface HourlyEntry {
  time: string;
  temperature: number;
  weatherCode: number;
  precipitationProbability: number;
  windSpeed: number;
  isDay: boolean;
}

export interface DailyEntry {
  date: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  precipitationProbability: number;
  uvIndexMax: number;
  sunrise: string;
  sunset: string;
  windSpeedMax: number;
}

export interface AirQuality {
  aqi: number;
  pm2_5: number;
  pm10: number;
  ozone: number;
  category: 'Good' | 'Moderate' | 'Unhealthy for Sensitive' | 'Unhealthy' | 'Very Unhealthy' | 'Hazardous';
  color: string;
}

export interface WeatherBundle {
  location: GeoLocation;
  current: CurrentConditions;
  hourly: HourlyEntry[];
  daily: DailyEntry[];
  airQuality: AirQuality | null;
}

export type TimeOfDay = 'dawn' | 'morning' | 'afternoon' | 'sunset' | 'evening' | 'night';

export type ConditionGroup =
  | 'clear'
  | 'partly-cloudy'
  | 'cloudy'
  | 'fog'
  | 'drizzle'
  | 'rain'
  | 'thunderstorm'
  | 'snow';
