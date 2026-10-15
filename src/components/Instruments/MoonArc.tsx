import { motion } from 'framer-motion';
import { clamp, formatTime } from '@/utils/format';
import { getMoonPhase, getNightSpan, type SkySpan } from '@/utils/astronomy';
import { MoonPhaseIcon } from '@/components/Instruments/MoonPhaseIcon';
import type { DailyEntry } from '@/types/weather';

function isoFromUTC(d: Date): string {
  // Reconstruct a naive "T HH:MM" style string from a naive-as-UTC Date so
  // formatTime's regex-based extractor can read it directly.
  return d.toISOString().replace('Z', '');
}

export function MoonArc({ now, daily }: { now: Date; daily: DailyEntry[] }) {
  const span: SkySpan = getNightSpan(now, daily);
  const moon = getMoonPhase(now);

  const pct = clamp((now.getTime() - span.start.getTime()) / (span.end.getTime() - span.start.getTime()), 0, 1);
  const isNighttime = now >= span.start && now <= span.end;

  const angle = Math.PI * (1 - pct);
  const cx = 100;
  const cy = 92;
  const r = 78;
  const x = cx - r * Math.cos(angle);
  const y = cy - r * Math.sin(angle);

  return (
    <div className="glass-panel col-span-2 flex flex-col items-center gap-2 rounded-3xl p-5 sm:col-span-1">
      <p className="self-start font-mono text-xs uppercase tracking-[0.2em] text-cloud/60">
        Moon · {moon.name}
      </p>
      <div className="flex w-full items-center gap-3">
        <MoonPhaseIcon moon={moon} size={48} />
        <svg viewBox="0 0 200 100" className="h-24 flex-1 overflow-visible">
          <path d="M 22 92 A 78 78 0 0 1 178 92" fill="none" stroke="rgba(245,247,250,0.22)" strokeWidth="2" />
          <line x1="8" y1="92" x2="192" y2="92" stroke="rgba(245,247,250,0.15)" strokeWidth="1" strokeDasharray="3 4" />
          {isNighttime && (
            <>
              <motion.circle
                cx={x}
                cy={y}
                r="12"
                fill="#AEB8E8"
                opacity={0.2}
                animate={{ cx: x, cy: y }}
                transition={{ type: 'spring', stiffness: 40, damping: 14 }}
              />
              <motion.circle
                cx={x}
                cy={y}
                r="6"
                fill="#F1E9D2"
                stroke="#AEB8E8"
                strokeWidth="1.5"
                initial={false}
                animate={{ cx: x, cy: y }}
                transition={{ type: 'spring', stiffness: 40, damping: 14 }}
              />
            </>
          )}
        </svg>
      </div>
      <div className="flex w-full justify-between font-mono text-xs text-cloud/70">
        <span>↑ {formatTime(isoFromUTC(span.start))}</span>
        <span>{Math.round(moon.illumination * 100)}% lit</span>
        <span>↓ {formatTime(isoFromUTC(span.end))}</span>
      </div>
    </div>
  );
}
