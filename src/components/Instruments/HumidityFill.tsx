import { motion } from 'framer-motion';

export function HumidityFill({ humidity, dewPoint }: { humidity: number; dewPoint: number }) {
  return (
    <div className="glass-panel flex flex-col items-center gap-3 rounded-3xl p-5">
      <p className="self-start font-mono text-xs uppercase tracking-[0.2em] text-cloud/60">Humidity</p>
      <div className="relative h-36 w-24 overflow-hidden rounded-full border border-glass-border bg-white/5">
        <motion.div
          className="absolute bottom-0 left-0 right-0"
          style={{ background: 'linear-gradient(180deg, #4CC3D9 0%, #2FB8AC 100%)' }}
          initial={{ height: 0 }}
          animate={{ height: `${humidity}%` }}
          transition={{ duration: 1.3, ease: 'easeOut' }}
        >
          <motion.div
            className="absolute -top-2 left-0 right-0 h-4 opacity-60"
            style={{
              background:
                'repeating-linear-gradient(90deg, transparent 0 10px, rgba(255,255,255,0.4) 10px 12px)',
            }}
            animate={{ x: ['0%', '-20%'] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
          />
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-2xl drop-shadow">{Math.round(humidity)}%</span>
        </div>
      </div>
      <p className="font-mono text-xs text-cloud/60">Dew point {Math.round(dewPoint)}°</p>
    </div>
  );
}
