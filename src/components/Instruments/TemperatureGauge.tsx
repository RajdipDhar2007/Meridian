import { motion } from 'framer-motion';
import { clamp } from '@/utils/format';

export function TemperatureGauge({ temp, low, high }: { temp: number; low: number; high: number }) {
  const pct = clamp((temp - low) / Math.max(1, high - low), 0, 1);
  const circumference = 2 * Math.PI * 88;

  return (
    <div className="relative flex h-56 w-56 items-center justify-center">
      <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
        <circle cx="100" cy="100" r="88" fill="none" stroke="rgba(245,247,250,0.1)" strokeWidth="6" />
        <motion.circle
          cx="100"
          cy="100"
          r="88"
          fill="none"
          stroke="#E8A33D"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference * (1 - pct) }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-display text-6xl leading-none">{Math.round(temp)}°</span>
        <span className="mt-2 font-mono text-xs text-cloud/60">
          H:{Math.round(high)}° L:{Math.round(low)}°
        </span>
      </div>
    </div>
  );
}
