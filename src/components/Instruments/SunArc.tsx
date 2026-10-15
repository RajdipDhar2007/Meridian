import { motion } from 'framer-motion';
import { clamp, formatTime } from '@/utils/format';
import { parseLocalAsUTC } from '@/utils/time';

export function SunArc({ sunrise, sunset, now }: { sunrise: string; sunset: string; now: Date }) {
  const sr = parseLocalAsUTC(sunrise).getTime();
  const ss = parseLocalAsUTC(sunset).getTime();
  const t = now.getTime();
  const pct = clamp((t - sr) / (ss - sr), 0, 1);
  const isDaytime = t >= sr && t <= ss;

  // Sweep left-to-right across a half circle: pct 0 -> angle PI (horizon,
  // left), pct 1 -> angle 0 (horizon, right).
  const angle = Math.PI * (1 - pct);
  const cx = 100;
  const cy = 92;
  const r = 78;
  const x = cx - r * Math.cos(angle);
  const y = cy - r * Math.sin(angle);

  return (
    <div className="glass-panel col-span-2 flex flex-col items-center gap-2 rounded-3xl p-5 sm:col-span-1">
      <p className="self-start font-mono text-xs uppercase tracking-[0.2em] text-cloud/60">
        {isDaytime ? 'Sun · above horizon' : 'Sun · below horizon'}
      </p>
      <svg viewBox="0 0 200 100" className="h-24 w-full overflow-visible">
        <path d="M 22 92 A 78 78 0 0 1 178 92" fill="none" stroke="rgba(245,247,250,0.22)" strokeWidth="2" />
        <line x1="8" y1="92" x2="192" y2="92" stroke="rgba(245,247,250,0.15)" strokeWidth="1" strokeDasharray="3 4" />
        {isDaytime && (
          <>
            <motion.circle
              cx={x}
              cy={y}
              r="14"
              fill="#E8A33D"
              opacity={0.25}
              animate={{ cx: x, cy: y }}
              transition={{ type: 'spring', stiffness: 40, damping: 14 }}
            />
            <motion.circle
              cx={x}
              cy={y}
              r="7"
              fill="#FFC868"
              stroke="#E8A33D"
              strokeWidth="1.5"
              initial={false}
              animate={{ cx: x, cy: y }}
              transition={{ type: 'spring', stiffness: 40, damping: 14 }}
            />
          </>
        )}
      </svg>
      <div className="flex w-full justify-between font-mono text-xs text-cloud/70">
        <span>↑ {formatTime(sunrise)}</span>
        <span>↓ {formatTime(sunset)}</span>
      </div>
    </div>
  );
}
