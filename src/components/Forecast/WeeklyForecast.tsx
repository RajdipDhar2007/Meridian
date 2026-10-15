import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Droplets, Sun as SunIcon, Wind } from 'lucide-react';
import type { DailyEntry } from '@/types/weather';
import { conditionGroup, conditionLabel } from '@/utils/weatherCode';
import { formatDayLabel, formatTime } from '@/utils/format';
import { WeatherGlyph } from '@/components/Forecast/WeatherGlyph';

export function WeeklyForecast({ days }: { days: DailyEntry[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const overallMin = Math.min(...days.map((d) => d.tempMin));
  const overallMax = Math.max(...days.map((d) => d.tempMax));

  return (
    <section className="glass-panel rounded-[2rem] p-5 sm:p-6">
      <h2 className="font-display text-lg">7-day outlook</h2>
      <div className="mt-3 divide-y divide-white/10">
        {days.slice(0, 7).map((day, i) => {
          const isOpen = openIndex === i;
          const leftPct = ((day.tempMin - overallMin) / Math.max(1, overallMax - overallMin)) * 100;
          const widthPct = ((day.tempMax - day.tempMin) / Math.max(1, overallMax - overallMin)) * 100;

          return (
            <div key={day.date}>
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-3 py-3 text-left"
              >
                <span className="w-12 font-mono text-sm text-cloud/70">{formatDayLabel(day.date, i)}</span>
                <WeatherGlyph group={conditionGroup(day.weatherCode)} isDay className="h-5 w-5 shrink-0" />
                {day.precipitationProbability > 10 && (
                  <span className="flex items-center gap-0.5 font-mono text-[10px] text-teal">
                    <Droplets className="h-3 w-3" aria-hidden />
                    {day.precipitationProbability}%
                  </span>
                )}
                <div className="ml-auto flex flex-1 max-w-[140px] items-center gap-2">
                  <span className="w-8 text-right font-mono text-xs text-cloud/50">{Math.round(day.tempMin)}°</span>
                  <div className="relative h-1.5 flex-1 rounded-full bg-white/10">
                    <div
                      className="absolute h-full rounded-full bg-gradient-to-r from-teal to-brass"
                      style={{ left: `${leftPct}%`, width: `${Math.max(8, widthPct)}%` }}
                    />
                  </div>
                  <span className="w-8 font-mono text-xs">{Math.round(day.tempMax)}°</span>
                </div>
                <ChevronDown className={`h-4 w-4 shrink-0 text-cloud/50 transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-3 gap-3 pb-4 font-mono text-xs text-cloud/70">
                      <div className="flex items-center gap-1.5">
                        <SunIcon className="h-3.5 w-3.5 text-brass" aria-hidden /> UV {Math.round(day.uvIndexMax)}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Wind className="h-3.5 w-3.5" aria-hidden /> {Math.round(day.windSpeedMax)} km/h
                      </div>
                      <div>{conditionLabel(day.weatherCode)}</div>
                      <div>Sunrise {formatTime(day.sunrise)}</div>
                      <div>Sunset {formatTime(day.sunset)}</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
