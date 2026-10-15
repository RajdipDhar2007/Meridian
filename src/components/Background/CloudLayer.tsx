import { useMemo } from 'react';
import type { CloudDensity, CloudTone } from '@/utils/theme';

const TONE_COLORS: Record<CloudTone, { core: string; mid: string; shadow: string }> = {
  white: { core: 'rgba(255,255,255,0.95)', mid: 'rgba(235,238,244,0.7)', shadow: 'rgba(160,170,190,0.35)' },
  slate: { core: 'rgba(222,227,236,0.9)', mid: 'rgba(190,198,212,0.6)', shadow: 'rgba(120,130,150,0.4)' },
  charcoal: { core: 'rgba(58,62,74,0.95)', mid: 'rgba(34,37,46,0.9)', shadow: 'rgba(8,9,14,0.7)' },
};

interface CloudSpec {
  key: number;
  top: string;
  scale: number;
  duration: string;
  delay: string;
  opacity: number;
  blur: number;
}

/** A single fluffy cloud built from several overlapping soft blobs — reads
 * as an actual cumulus puff rather than one flat ellipse smear. */
function Puff({ spec, colors }: { spec: CloudSpec; colors: (typeof TONE_COLORS)['white'] }) {
  const w = 220 * spec.scale;
  const h = 78 * spec.scale;
  return (
    <div
      className="absolute animate-drift"
      style={{
        top: spec.top,
        width: w,
        height: h,
        opacity: spec.opacity,
        animationDuration: spec.duration,
        animationDelay: spec.delay,
        filter: `blur(${spec.blur}px)`,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: [
            `radial-gradient(ellipse 34% 62% at 20% 70%, ${colors.mid} 0%, transparent 72%)`,
            `radial-gradient(ellipse 40% 70% at 42% 40%, ${colors.core} 0%, transparent 75%)`,
            `radial-gradient(ellipse 36% 64% at 66% 55%, ${colors.core} 0%, transparent 74%)`,
            `radial-gradient(ellipse 32% 58% at 85% 68%, ${colors.mid} 0%, transparent 70%)`,
            `radial-gradient(ellipse 50% 40% at 50% 85%, ${colors.shadow} 0%, transparent 80%)`,
          ].join(', '),
        }}
      />
    </div>
  );
}

export function CloudLayer({
  density,
  tone,
  isNight,
}: {
  density: CloudDensity;
  tone: CloudTone;
  isNight: boolean;
}) {
  const count = density === 'heavy' ? 8 : density === 'soft' ? 4 : 0;
  const dim = isNight ? 0.65 : 1;
  const colors = TONE_COLORS[tone];

  const clouds = useMemo<CloudSpec[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        key: i,
        top: `${4 + Math.random() * 58}%`,
        scale: 0.55 + Math.random() * 1.15,
        duration: `${(density === 'heavy' ? 55 : 75) + Math.random() * 50}s`,
        delay: `${-Math.random() * 60}s`,
        opacity: (density === 'heavy' ? 0.55 + Math.random() * 0.35 : 0.28 + Math.random() * 0.28) * dim,
        blur: 3 + Math.random() * 5,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count, density, tone, isNight],
  );

  if (count === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {clouds.map((c) => (
        <Puff key={c.key} spec={c} colors={colors} />
      ))}
    </div>
  );
}
