import { motion } from 'framer-motion';
import { Droplets } from 'lucide-react';
import type { HourlyEntry } from '@/types/weather';
import { formatHour } from '@/utils/format';
import { conditionGroup } from '@/utils/weatherCode';
import { WeatherGlyph } from '@/components/Forecast/WeatherGlyph';

export function HourlyForecast({ hours }: { hours: HourlyEntry[] }) {
  const next = hours.slice(0, 24);
  const temps = next.map((h) => h.temperature);
  const min = Math.min(...temps);
  const max = Math.max(...temps) || min + 1;
  const points = next
    .map((h, i) => {
      const x = (i / (next.length - 1)) * 100;
      const y = 30 - ((h.temperature - min) / Math.max(1, max - min)) * 26;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <section className="glass-panel rounded-[2rem] p-5 sm:p-6">
      <h2 className="font-display text-lg">Next 24 hours</h2>
      <svg viewBox="0 0 100 30" className="mt-3 h-10 w-full opacity-70" preserveAspectRatio="none">
        <polyline points={points} fill="none" stroke="#E8A33D" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto pb-1">
        {next.map((hour, i) => (
          <motion.div
            key={hour.time}
            whileHover={{ y: -4 }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.02, 0.3) }}
            className="flex min-w-[68px] flex-col items-center gap-1.5 rounded-2xl border border-glass-border bg-white/5 px-3 py-3"
          >
            <span className="font-mono text-[11px] text-cloud/60">{i === 0 ? 'Now' : formatHour(hour.time)}</span>
            <WeatherGlyph group={conditionGroup(hour.weatherCode)} isDay={hour.isDay} className="h-6 w-6" />
            <span className="font-display text-lg">{Math.round(hour.temperature)}°</span>
            {hour.precipitationProbability > 0 && (
              <span className="flex items-center gap-0.5 font-mono text-[10px] text-teal">
                <Droplets className="h-3 w-3" aria-hidden />
                {hour.precipitationProbability}%
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
