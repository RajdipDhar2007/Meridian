/**
 * Open-Meteo (with `timezone=auto`) returns naive datetime strings that are
 * already local to the *queried location*, e.g. "2026-07-21T06:30" with no
 * offset. `new Date(...)` on a string like that is parsed using the
 * *browser's* local timezone, which silently corrupts every comparison
 * whenever the viewer isn't in the same timezone as the forecast location.
 *
 * The fix: never let those naive strings pass through the device's
 * timezone. Instead, treat every naive local timestamp as if it were UTC
 * (via parseLocalAsUTC), and convert "the current instant" into the
 * equivalent wall-clock reading for the location's real timezone, also
 * expressed as if it were UTC (via nowAtTimezone). Both sides of any
 * comparison then live in the same made-up-but-consistent "local-as-UTC"
 * frame, so subtraction/ordering works regardless of where the device is.
 */

export function parseLocalAsUTC(iso: string): Date {
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?/);
  if (!m) return new Date(iso);
  const [, y, mo, d, h, mi, s] = m;
  return new Date(Date.UTC(+y, +mo - 1, +d, +h, +mi, s ? +s : 0));
}

export function nowAtTimezone(timezone?: string): Date {
  if (!timezone) return new Date();
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(new Date());

  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? '0');
  const hour = get('hour');
  return new Date(Date.UTC(get('year'), get('month') - 1, get('day'), hour === 24 ? 0 : hour, get('minute'), get('second')));
}

/** Date-only string ("2026-07-21") -> a UTC-midnight Date, safe for weekday lookups. */
export function parseDateOnlyUTC(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}
