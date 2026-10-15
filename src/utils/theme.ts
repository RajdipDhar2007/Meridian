import type { ConditionGroup, TimeOfDay } from '@/types/weather';

interface ThemeInput {
  now: Date;
  sunrise: Date;
  sunset: Date;
}

/**
 * Resolves one of six time-of-day buckets from the current instant relative
 * to sunrise/sunset, giving dawn/sunset a ~50 minute window on either side.
 */
export function resolveTimeOfDay({ now, sunrise, sunset }: ThemeInput): TimeOfDay {
  const t = now.getTime();
  const sr = sunrise.getTime();
  const ss = sunset.getTime();
  const window = 50 * 60 * 1000;

  if (t < sr - window) return 'night';
  if (t < sr + window) return 'dawn';
  if (t < ss - window) {
    const midday = (sr + ss) / 2;
    return t < midday ? 'morning' : 'afternoon';
  }
  if (t < ss + window) return 'sunset';
  const lateEvening = ss + window + 3 * 60 * 60 * 1000;
  return t < lateEvening ? 'evening' : 'night';
}

export type CloudTone = 'white' | 'slate' | 'charcoal';
export type CloudDensity = 'none' | 'soft' | 'heavy';

export interface ThemeLayers {
  stars: boolean;
  clouds: CloudDensity;
  cloudTone: CloudTone;
  rain: 'none' | 'light' | 'heavy';
  snow: boolean;
  fog: boolean;
  lightning: boolean;
  sunGlow: boolean;
}

export interface ThemeTokens {
  gradient: string;
  overlay: string;
  accent: string;
  isNight: boolean;
  layers: ThemeLayers;
  label: string;
}

const SKY_BY_TIME: Record<TimeOfDay, string> = {
  dawn: 'linear-gradient(160deg, #2B2650 0%, #7A4F6E 45%, #E08A5C 100%)',
  morning: 'linear-gradient(160deg, #2E7FB8 0%, #5FA8D3 55%, #BFE3F0 100%)',
  afternoon: 'linear-gradient(160deg, #1D6FB0 0%, #4C9BD1 60%, #A9D8EA 100%)',
  sunset: 'linear-gradient(160deg, #2A2359 0%, #A5487B 45%, #E88A3C 100%)',
  evening: 'linear-gradient(160deg, #0E1230 0%, #2B2A5C 55%, #55507E 100%)',
  night: 'linear-gradient(160deg, #060915 0%, #0E1630 55%, #1B2340 100%)',
};

// Storm/rain skies are recoloured darker regardless of time of day — a
// thunderstorm at 2pm should still look ominous, not cheerfully blue.
const STORM_SKY_BY_TIME: Partial<Record<TimeOfDay, string>> = {
  dawn: 'linear-gradient(160deg, #1B1C2E 0%, #2E2A3E 55%, #4A4552 100%)',
  morning: 'linear-gradient(160deg, #182234 0%, #2B3446 55%, #46505E 100%)',
  afternoon: 'linear-gradient(160deg, #16202E 0%, #283242 55%, #414B58 100%)',
  sunset: 'linear-gradient(160deg, #17151F 0%, #2C2436 45%, #453A44 100%)',
  evening: 'linear-gradient(160deg, #08090F 0%, #14141F 55%, #201F2C 100%)',
  night: 'linear-gradient(160deg, #05050A 0%, #0B0B14 55%, #14141F 100%)',
};

const CONDITION_OVERLAY: Record<ConditionGroup, string> = {
  clear: 'transparent',
  'partly-cloudy': 'rgba(40,48,66,0.14)',
  cloudy: 'rgba(30,36,50,0.3)',
  fog: 'rgba(160,166,176,0.32)',
  drizzle: 'rgba(10,14,22,0.38)',
  rain: 'rgba(4,7,14,0.46)',
  thunderstorm: 'rgba(2,3,8,0.55)',
  snow: 'rgba(190,198,212,0.22)',
};

export function resolveTheme(group: ConditionGroup, time: TimeOfDay): ThemeTokens {
  const isNight = time === 'night' || time === 'evening';
  const isStormy = group === 'rain' || group === 'drizzle' || group === 'thunderstorm';
  const gradient = isStormy ? STORM_SKY_BY_TIME[time] ?? SKY_BY_TIME[time] : SKY_BY_TIME[time];
  const overlay = CONDITION_OVERLAY[group];

  const layers: ThemeLayers = {
    stars: isNight && (group === 'clear' || group === 'partly-cloudy'),
    clouds: 'none',
    cloudTone: 'white',
    rain: 'none',
    snow: false,
    fog: false,
    lightning: false,
    sunGlow: group === 'clear' && !isNight,
  };

  switch (group) {
    case 'partly-cloudy':
      layers.clouds = 'soft';
      layers.cloudTone = 'white';
      break;
    case 'cloudy':
      layers.clouds = 'heavy';
      layers.cloudTone = 'white';
      break;
    case 'fog':
      layers.fog = true;
      layers.clouds = 'soft';
      layers.cloudTone = 'slate';
      break;
    case 'drizzle':
      layers.clouds = 'heavy';
      layers.cloudTone = 'charcoal';
      layers.rain = 'light';
      break;
    case 'rain':
      layers.clouds = 'heavy';
      layers.cloudTone = 'charcoal';
      layers.rain = 'heavy';
      break;
    case 'thunderstorm':
      layers.clouds = 'heavy';
      layers.cloudTone = 'charcoal';
      layers.rain = 'heavy';
      layers.lightning = true;
      break;
    case 'snow':
      layers.clouds = 'heavy';
      layers.cloudTone = 'slate';
      layers.snow = true;
      break;
    default:
      break;
  }

  return {
    gradient,
    overlay,
    accent: isNight ? '#8FA8FF' : '#E8A33D',
    isNight,
    layers,
    label: `${group} · ${time}`,
  };
}
