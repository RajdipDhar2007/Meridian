import { motion } from 'framer-motion';
import { clamp } from '@/utils/format';

export function PressureGauge({ pressure }: { pressure: number }) {
  // Typical sea-level range for the needle sweep.
  const min = 970;
  const max = 1050;
  const pct = clamp((pressure - min) / (max - min), 0, 1);
  const angle = -120 + pct * 240;
  const trend = pressure > 1013 ? 'High' : pressure < 1000 ? 'Low' : 'Normal';

  return (
    <div className="glass-panel flex flex-col items-center gap-3 rounded-3xl p-5">
      <p className="self-start font-mono text-xs uppercase tracking-[0.2em] text-cloud/60">Pressure</p>
      <div className="instrument-dial relative flex h-36 w-36 items-center justify-center rounded-full">
        <svg viewBox="0 0 140 140" className="absolute h-full w-full">
          {Array.from({ length: 13 }, (_, i) => {
            const deg = -120 + i * 20;
            const rad = (deg - 90) * (Math.PI / 180);
            const x1 = 70 + 55 * Math.cos(rad);
            const y1 = 70 + 55 * Math.sin(rad);
            const x2 = 70 + 48 * Math.cos(rad);
            const y2 = 70 + 48 * Math.sin(rad);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(245,247,250,0.4)" strokeWidth="1.5" />;
          })}
        </svg>
        <motion.div
          className="absolute h-14 w-1 origin-bottom rounded-full bg-teal"
          style={{ bottom: '50%', clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}
          initial={{ rotate: -120 }}
          animate={{ rotate: angle }}
          transition={{ type: 'spring', stiffness: 50, damping: 11 }}
        />
        <div className="absolute h-2.5 w-2.5 rounded-full bg-cloud" />
        <div className="absolute bottom-4 flex flex-col items-center">
          <span className="font-display text-lg">{Math.round(pressure)}</span>
          <span className="font-mono text-[9px] text-cloud/60">hPa · {trend}</span>
        </div>
      </div>
    </div>
  );
}
