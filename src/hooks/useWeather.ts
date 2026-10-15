import { useCallback, useEffect, useRef, useState } from 'react';
import type { GeoLocation, WeatherBundle } from '@/types/weather';
import { fetchWeatherBundle } from '@/services/openMeteo';

const FALLBACK_LOCATION: GeoLocation = {
  latitude: 40.7128,
  longitude: -74.006,
  name: 'New York',
  admin1: 'New York',
  country: 'United States',
};

const RECENTS_KEY = 'meridian.recent-locations';
const MAX_RECENTS = 6;

function loadRecents(): GeoLocation[] {
  try {
    const raw = localStorage.getItem(RECENTS_KEY);
    return raw ? (JSON.parse(raw) as GeoLocation[]) : [];
  } catch {
    return [];
  }
}

function saveRecents(list: GeoLocation[]) {
  try {
    localStorage.setItem(RECENTS_KEY, JSON.stringify(list.slice(0, MAX_RECENTS)));
  } catch {
    // storage may be unavailable (private mode); fail silently
  }
}

export function useWeather() {
  const [bundle, setBundle] = useState<WeatherBundle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recents, setRecents] = useState<GeoLocation[]>(() => loadRecents());
  const requestId = useRef(0);

  const loadLocation = useCallback(async (location: GeoLocation, remember = true) => {
    const id = ++requestId.current;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherBundle(location);
      if (id !== requestId.current) return; // a newer request superseded this one
      setBundle(data);
      if (remember) {
        setRecents((prev) => {
          const deduped = prev.filter(
            (r) => Math.abs(r.latitude - location.latitude) > 0.05 || Math.abs(r.longitude - location.longitude) > 0.05,
          );
          const next = [location, ...deduped].slice(0, MAX_RECENTS);
          saveRecents(next);
          return next;
        });
      }
    } catch (err) {
      if (id !== requestId.current) return;
      setError(err instanceof Error ? err.message : 'Unable to load weather data.');
    } finally {
      if (id === requestId.current) setLoading(false);
    }
  }, []);

  const loadFallback = useCallback(() => {
    void loadLocation(FALLBACK_LOCATION, false);
  }, [loadLocation]);

  const refresh = useCallback(() => {
    if (bundle) void loadLocation(bundle.location, false);
  }, [bundle, loadLocation]);

  // Auto-refresh every 10 minutes to keep conditions live.
  useEffect(() => {
    const interval = setInterval(() => {
      refresh();
    }, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, [refresh]);

  return { bundle, loading, error, loadLocation, loadFallback, refresh, recents, fallbackLocation: FALLBACK_LOCATION };
}
