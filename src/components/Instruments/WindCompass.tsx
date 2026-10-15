import { motion } from 'framer-motion';
import { degreesToCompass } from '@/utils/format';

export function WindCompass({ speed, gusts, direction }: { speed: number; gusts: number; direction: number }) {
  const ticks = Array.from({ length: 16 }, (_, i) => i * 22.5);

  return (
    <div className="glass-panel flex flex-col items-center gap-3 rounded-3xl p-5">
      <p className="self-start font-mono text-xs uppercase tracking-[0.2em] text-cloud/60">Wind</p>
      <div className="instrument-dial relative flex h-36 w-36 items-center justify-center rounded-full">
        <svg viewBox="0 0 140 140" className="absolute h-full w-full">
          {ticks.map((deg) => (
            <line
              key={deg}
              x1="70"
              y1="10"
              x2="70"
              y2={deg % 90 === 0 ? '20' : '16'}
              stroke="rgba(245,247,250,0.4)"
              strokeWidth={deg % 90 === 0 ? 2 : 1}
              transform={`rotate(${deg} 70 70)`}
            />
          ))}
          {['N', 'E', 'S', 'W'].map((label, i) => {
            const angle = i * 90;
            const rad = (angle - 90) * (Math.PI / 180);
            const x = 70 + 46 * Math.cos(rad);
            const y = 70 + 46 * Math.sin(rad);
            return (
              <text
                key={label}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-cloud/70"
                fontSize="9"
                fontFamily="JetBrains Mono, monospace"
              >
                {label}
              </text>
            );
          })}
        </svg>
        <motion.div
          className="absolute h-24 w-1.5 origin-center rounded-full bg-brass"
          initial={{ rotate: 0 }}
          animate={{ rotate: direction }}
          transition={{ type: 'spring', stiffness: 60, damping: 12 }}
          style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}
        />
        <div className="absolute h-3 w-3 rounded-full bg-cloud" />
      </div>
      <div className="text-center">
        <p className="font-display text-2xl">{Math.round(speed)} <span className="text-sm text-cloud/60">km/h</span></p>
        <p className="font-mono text-xs text-cloud/60">
          {degreesToCompass(direction)} · gusts {Math.round(gusts)} km/h
        </p>
      </div>
    </div>
  );
}
