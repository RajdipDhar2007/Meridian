import type { ConditionGroup } from '@/types/weather';

interface CodeMeta {
  label: string;
  group: ConditionGroup;
}

// WMO Weather interpretation codes used by Open-Meteo.
const CODE_MAP: Record<number, CodeMeta> = {
  0: { label: 'Clear sky', group: 'clear' },
  1: { label: 'Mainly clear', group: 'clear' },
  2: { label: 'Partly cloudy', group: 'partly-cloudy' },
  3: { label: 'Overcast', group: 'cloudy' },
  45: { label: 'Fog', group: 'fog' },
  48: { label: 'Rime fog', group: 'fog' },
  51: { label: 'Light drizzle', group: 'drizzle' },
  53: { label: 'Drizzle', group: 'drizzle' },
  55: { label: 'Dense drizzle', group: 'drizzle' },
  56: { label: 'Freezing drizzle', group: 'drizzle' },
  57: { label: 'Dense freezing drizzle', group: 'drizzle' },
  61: { label: 'Light rain', group: 'rain' },
  63: { label: 'Rain', group: 'rain' },
  65: { label: 'Heavy rain', group: 'rain' },
  66: { label: 'Freezing rain', group: 'rain' },
  67: { label: 'Heavy freezing rain', group: 'rain' },
  71: { label: 'Light snow', group: 'snow' },
  73: { label: 'Snow', group: 'snow' },
  75: { label: 'Heavy snow', group: 'snow' },
  77: { label: 'Snow grains', group: 'snow' },
  80: { label: 'Light showers', group: 'rain' },
  81: { label: 'Showers', group: 'rain' },
  82: { label: 'Violent showers', group: 'rain' },
  85: { label: 'Snow showers', group: 'snow' },
  86: { label: 'Heavy snow showers', group: 'snow' },
  95: { label: 'Thunderstorm', group: 'thunderstorm' },
  96: { label: 'Thunderstorm with hail', group: 'thunderstorm' },
  99: { label: 'Severe thunderstorm', group: 'thunderstorm' },
};

export function decodeWeatherCode(code: number): CodeMeta {
  return CODE_MAP[code] ?? { label: 'Unknown', group: 'cloudy' };
}

export function conditionGroup(code: number): ConditionGroup {
  return decodeWeatherCode(code).group;
}

export function conditionLabel(code: number): string {
  return decodeWeatherCode(code).label;
}
