import type { GeoLocation } from '@/types/weather';

const GEOCODE_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const REVERSE_URL = 'https://geocoding-api.open-meteo.com/v1/reverse';

interface GeocodeResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string;
  timezone?: string;
}

interface GeocodeResponse {
  results?: GeocodeResult[];
}

export async function searchLocations(query: string): Promise<GeoLocation[]> {
  if (!query.trim()) return [];
  const params = new URLSearchParams({ name: query, count: '8', language: 'en', format: 'json' });
  const res = await fetch(`${GEOCODE_URL}?${params.toString()}`);
  if (!res.ok) throw new Error('Location search failed');
  const data = (await res.json()) as GeocodeResponse;
  return (data.results ?? []).map((r) => ({
    latitude: r.latitude,
    longitude: r.longitude,
    name: r.name,
    admin1: r.admin1,
    country: r.country,
    timezone: r.timezone,
  }));
}

export async function reverseGeocode(lat: number, lon: number): Promise<GeoLocation> {
  const params = new URLSearchParams({
    latitude: lat.toFixed(4),
    longitude: lon.toFixed(4),
    language: 'en',
    format: 'json',
  });
  try {
    const res = await fetch(`${REVERSE_URL}?${params.toString()}`);
    if (res.ok) {
      const data = (await res.json()) as GeocodeResponse;
      const hit = data.results?.[0];
      if (hit) {
        return {
          latitude: hit.latitude,
          longitude: hit.longitude,
          name: hit.name,
          admin1: hit.admin1,
          country: hit.country,
          timezone: hit.timezone,
        };
      }
    }
  } catch {
    // fall through to coordinate fallback below
  }
  return {
    latitude: lat,
    longitude: lon,
    name: `${lat.toFixed(2)}, ${lon.toFixed(2)}`,
  };
}
