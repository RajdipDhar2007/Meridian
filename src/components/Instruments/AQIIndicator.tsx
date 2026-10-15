import { motion } from 'framer-motion';
import { clamp } from '@/utils/format';
import type { AirQuality } from '@/types/weather';

export function AQIIndicator({ air }: { air: AirQuality | null }) {
  if (!air) {
    return (
      <div className="glass-panel flex flex-col items-center justify-center gap-2 rounded-3xl p-5 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-cloud/60">Air Quality</p>
        <p className="text-sm text-cloud/50">Unavailable</p>
      </div>
    );
  }

  const pct = clamp(air.aqi / 300, 0, 1);

  return (
    <div className="glass-panel flex flex-col items-center gap-3 rounded-3xl p-5">
      <p className="self-start font-mono text-xs uppercase tracking-[0.2em] text-cloud/60">Air Quality</p>
      <div className="flex flex-col items-center gap-1">
        <span className="font-display text-4xl" style={{ color: air.color }}>{air.aqi}</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-cloud/60">{air.category}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full"
          style={{ background: air.color }}
          initial={{ width: 0 }}
          animate={{ width: `${pct * 100}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
      <div className="grid w-full grid-cols-2 gap-2 text-center font-mono text-[10px] text-cloud/60">
        <div>PM2.5 <span className="block text-cloud">{Math.round(air.pm2_5)}</span></div>
        <div>PM10 <span className="block text-cloud">{Math.round(air.pm10)}</span></div>
      </div>
    </div>
  );
}
