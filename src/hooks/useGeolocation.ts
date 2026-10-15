import { useCallback, useState } from 'react';

interface GeoState {
  status: 'idle' | 'locating' | 'granted' | 'denied' | 'unsupported' | 'error';
  coords: { latitude: number; longitude: number } | null;
  error: string | null;
}

export function useGeolocation() {
  const [state, setState] = useState<GeoState>({ status: 'idle', coords: null, error: null });

  const request = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setState({ status: 'unsupported', coords: null, error: 'Geolocation is not supported on this device.' });
      return;
    }
    setState((s) => ({ ...s, status: 'locating', error: null }));
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setState({
          status: 'granted',
          coords: { latitude: pos.coords.latitude, longitude: pos.coords.longitude },
          error: null,
        });
      },
      (err) => {
        const denied = err.code === err.PERMISSION_DENIED;
        setState({
          status: denied ? 'denied' : 'error',
          coords: null,
          error: denied ? 'Location access was denied.' : 'Could not determine your location.',
        });
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 5 * 60 * 1000 },
    );
  }, []);

  return { ...state, request };
}
