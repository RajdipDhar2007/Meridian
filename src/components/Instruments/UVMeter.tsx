import { motion } from 'framer-motion';
import { clamp } from '@/utils/format';

function uvColor(uv: number): string {
  if (uv < 3) return '#2FB8AC';
  if (uv < 6) return '#E8C93D';
  if (uv < 8) return '#E8A33D';
  if (uv < 11) return '#D9633D';
  return '#A5487B';
}

function uvLabel(uv: number): string {
  if (uv < 3) return 'Low';
  if (uv < 6) return 'Moderate';
  if (uv < 8) return 'High';
  if (uv < 11) return 'Very High';
  return 'Extreme';
}

export function UVMeter({ uv }: { uv: number }) {
  const pct = clamp(uv / 12, 0, 1);
  const circumference = 2 * Math.PI * 52;
  const color = uvColor(uv);

  return (
    <div className="glass-panel flex flex-col items-center gap-3 rounded-3xl p-5">
      <p className="self-start font-mono text-xs uppercase tracking-[0.2em] text-cloud/60">UV Index</p>
      <div className="relative flex h-36 w-36 items-center justify-center">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(245,247,250,0.12)" strokeWidth="8" />
          <motion.circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference * (1 - pct) }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="font-display text-3xl">{Math.round(uv)}</span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-cloud/60">{uvLabel(uv)}</span>
        </div>
      </div>
    </div>
  );
}
