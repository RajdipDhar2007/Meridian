import { parseDateOnlyUTC } from '@/utils/time';

const COMPASS = [
  'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
  'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW',
];

export function degreesToCompass(deg: number): string {
  const idx = Math.round((deg % 360) / 22.5) % 16;
  return COMPASS[idx];
}

export function formatTemp(value: number, unit: 'C' | 'F' = 'C'): string {
  return `${Math.round(value)}°${unit}`;
}

export function celsiusToFahrenheit(c: number): number {
  return (c * 9) / 5 + 32;
}

/** Extracts HH:mm directly from a naive local ISO string — no timezone math needed. */
function extractTime(iso: string): { hour: number; minute: number } {
  const m = iso.match(/T(\d{2}):(\d{2})/);
  return m ? { hour: Number(m[1]), minute: Number(m[2]) } : { hour: 0, minute: 0 };
}

export function formatTime(iso: string): string {
  const { hour, minute } = extractTime(iso);
  const period = hour >= 12 ? 'PM' : 'AM';
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${h12}:${String(minute).padStart(2, '0')} ${period}`;
}

export function formatHour(iso: string): string {
  const { hour } = extractTime(iso);
  const period = hour >= 12 ? 'PM' : 'AM';
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${h12}${period}`;
}

export function formatDayLabel(dateOrIso: string, index: number): string {
  if (index === 0) return 'Today';
  const datePart = dateOrIso.slice(0, 10);
  return parseDateOnlyUTC(datePart).toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' });
}

export function formatFullDate(iso: string): string {
  const datePart = iso.slice(0, 10);
  return parseDateOnlyUTC(datePart).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
