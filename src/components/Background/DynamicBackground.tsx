import { AnimatePresence, motion } from 'framer-motion';
import type { ThemeTokens } from '@/utils/theme';
import { ParticleField } from './ParticleField';
import { StarField } from './StarField';
import { CloudLayer } from './CloudLayer';
import { Lightning } from './Lightning';

export function DynamicBackground({ theme }: { theme: ThemeTokens }) {
  const { layers } = theme;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={theme.gradient}
          className="absolute inset-0"
          style={{ background: theme.gradient }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        />
      </AnimatePresence>

      {layers.sunGlow && (
        <div
          className="absolute -left-1/4 -top-1/4 h-[80vh] w-[80vh] rounded-full opacity-40"
          style={{ background: 'radial-gradient(circle, rgba(255,214,140,0.5) 0%, transparent 70%)' }}
          aria-hidden
        />
      )}

      {layers.stars && <StarField />}

      {layers.fog && <ParticleField kind="fog" isNight={theme.isNight} />}

      {layers.clouds !== 'none' && (
        <CloudLayer density={layers.clouds} tone={layers.cloudTone} isNight={theme.isNight} />
      )}

      {layers.rain !== 'none' && (
        <ParticleField kind="rain" isNight={theme.isNight} intensity={layers.rain} />
      )}
      {layers.snow && <ParticleField kind="snow" isNight={theme.isNight} />}

      {layers.lightning && <Lightning />}

      <div className="absolute inset-0 transition-colors duration-1000" style={{ backgroundColor: theme.overlay }} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/70" />
    </div>
  );
}
