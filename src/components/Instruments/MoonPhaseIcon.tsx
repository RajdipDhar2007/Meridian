import type { MoonPhase } from '@/utils/astronomy';

/**
 * Builds the classic two-arc moon silhouette: a fixed half-circle for the
 * illuminated limb (right side while waxing, left while waning) joined to an
 * elliptical terminator arc whose horizontal radius tracks cos(phase * 2π).
 * At phase 0/1 the two arcs cancel out (no light); at 0.25/0.75 the
 * terminator flattens to a straight line (quarter moon); at 0.5 both arcs
 * bulge the same way, filling the full disk.
 */
function buildLitPath(phase: number, r: number, cx: number, cy: number): string {
  const theta = phase * Math.PI * 2;
  const rx = Math.abs(r * Math.cos(theta));
  const waxing = phase < 0.5;
  const outerSweep = waxing ? 1 : 0;
  const inQuarterHalf = phase < 0.25 || phase > 0.75;
  const terminatorSweep = waxing ? (inQuarterHalf ? 1 : 0) : (inQuarterHalf ? 0 : 1);

  return [
    `M ${cx} ${cy - r}`,
    `A ${r} ${r} 0 0 ${outerSweep} ${cx} ${cy + r}`,
    `A ${rx} ${r} 0 0 ${terminatorSweep} ${cx} ${cy - r}`,
    'Z',
  ].join(' ');
}

export function MoonPhaseIcon({ moon, size = 56 }: { moon: MoonPhase; size?: number }) {
  const r = 46;
  const c = 50;
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} role="img" aria-label={moon.name}>
      <circle cx={c} cy={c} r={r} fill="#141B33" stroke="rgba(245,247,250,0.25)" strokeWidth="1.5" />
      <path d={buildLitPath(moon.phase, r, c, c)} fill="#F1E9D2" opacity={0.95} />
      <circle cx={c} cy={c} r={r} fill="none" stroke="rgba(245,247,250,0.2)" strokeWidth="1" />
    </svg>
  );
}
