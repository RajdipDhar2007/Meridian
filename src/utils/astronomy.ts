import type { DailyEntry } from '@/types/weather';
import { parseLocalAsUTC } from '@/utils/time';

const SYNODIC_MONTH_DAYS = 29.530588853;
// A known new moon reference instant (Jan 6, 2000, 18:14 UTC).
const REFERENCE_NEW_MOON = Date.UTC(2000, 0, 6, 18, 14, 0);

export interface MoonPhase {
  /** 0 = new moon, 0.5 = full moon, wrapping back to 1 = new moon. */
  phase: number;
  illumination: number; // 0..1
  name: string;
  waxing: boolean;
}

export function getMoonPhase(date: Date): MoonPhase {
  const daysSinceNew = (date.getTime() - REFERENCE_NEW_MOON) / 86400000;
  const phase = (((daysSinceNew % SYNODIC_MONTH_DAYS) + SYNODIC_MONTH_DAYS) % SYNODIC_MONTH_DAYS) / SYNODIC_MONTH_DAYS;
  const illumination = (1 - Math.cos(2 * Math.PI * phase)) / 2;

  let name: string;
  if (phase < 0.02 || phase > 0.98) name = 'New Moon';
  else if (phase < 0.24) name = 'Waxing Crescent';
  else if (phase < 0.26) name = 'First Quarter';
  else if (phase < 0.49) name = 'Waxing Gibbous';
  else if (phase < 0.51) name = 'Full Moon';
  else if (phase < 0.74) name = 'Waning Gibbous';
  else if (phase < 0.76) name = 'Last Quarter';
  else name = 'Waning Crescent';

  return { phase, illumination, name, waxing: phase < 0.5 };
}

export interface SkySpan {
  start: Date;
  end: Date;
}

/**
 * The sun's span for "today" is simply sunrise -> sunset from the daily
 * record whose date matches `now`. For the moon we instead need the *night*
 * span framing the current instant: if we're past tonight's sunset, that's
 * [today's sunset, tomorrow's sunrise]; if we're before today's sunrise,
 * it's [yesterday's sunset, today's sunrise] — approximated using today's
 * sunrise minus a typical night length when yesterday's data isn't available,
 * since the forecast API only looks forward.
 */
export function getNightSpan(now: Date, daily: DailyEntry[]): SkySpan {
  const today = daily[0];
  const sunriseToday = parseLocalAsUTC(today.sunrise);
  const sunsetToday = parseLocalAsUTC(today.sunset);

  if (now < sunriseToday) {
    const approxNightLengthMs = 11 * 60 * 60 * 1000;
    return { start: new Date(sunriseToday.getTime() - approxNightLengthMs), end: sunriseToday };
  }

  const tomorrow = daily[1];
  const sunriseTomorrow = tomorrow
    ? parseLocalAsUTC(tomorrow.sunrise)
    : new Date(sunsetToday.getTime() + 11 * 60 * 60 * 1000);

  return { start: sunsetToday, end: sunriseTomorrow };
}

export function getDaySpan(daily: DailyEntry[]): SkySpan {
  const today = daily[0];
  return { start: parseLocalAsUTC(today.sunrise), end: parseLocalAsUTC(today.sunset) };
}
