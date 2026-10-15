import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Eye, Wind, Gauge, RefreshCw } from 'lucide-react';
import type { WeatherBundle } from '@/types/weather';
import { conditionLabel } from '@/utils/weatherCode';
import { useClock } from '@/hooks/useClock';
import { TemperatureGauge } from '@/components/Instruments/TemperatureGauge';

export function CurrentWeatherHero({ bundle, onRefresh, refreshing }: { bundle: WeatherBundle; onRefresh: () => void; refreshing: boolean }) {
  const { current, daily, location } = bundle;
  const today = daily[0];
  const { time, date } = useClock(location.timezone, 1000);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-panel rounded-[2rem] p-6 sm:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-cloud/80">
            <MapPin className="h-4 w-4" aria-hidden />
            <h1 className="font-display text-xl sm:text-2xl">
              {location.name}
              {location.admin1 ? `, ${location.admin1}` : ''}
            </h1>
          </div>
          <p className="font-mono text-xs text-cloud/50">{location.country}</p>
          <p className="mt-1 flex items-baseline gap-2 text-sm text-cloud/70">
            <span className="font-mono text-base tabular-nums text-cloud">{time}</span>
            <span>{date} local time</span>
          </p>
        </div>
        <button
          onClick={onRefresh}
          aria-label="Refresh weather data"
          className="rounded-full border border-glass-border bg-glass p-2.5 transition hover:bg-white/10"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} aria-hidden />
        </button>
      </div>

      <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <TemperatureGauge temp={current.temperature} low={today.tempMin} high={today.tempMax} />
        <div className="text-center sm:text-right">
          <p className="font-display text-2xl">{conditionLabel(current.weatherCode)}</p>
          <p className="text-sm text-cloud/60">Feels like {Math.round(current.apparentTemperature)}°</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat icon={<Wind className="h-4 w-4" aria-hidden />} label="Wind" value={`${Math.round(current.windSpeed)} km/h`} />
        <Stat icon={<Eye className="h-4 w-4" aria-hidden />} label="Visibility" value={`${(current.visibility / 1000).toFixed(1)} km`} />
        <Stat icon={<Gauge className="h-4 w-4" aria-hidden />} label="Cloud cover" value={`${Math.round(current.cloudCover)}%`} />
        <Stat icon={<Gauge className="h-4 w-4" aria-hidden />} label="Precipitation" value={`${current.precipitation.toFixed(1)} mm`} />
      </div>
    </motion.section>
  );
}

function Stat({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-glass-border bg-white/5 p-3">
      <div className="flex items-center gap-1.5 text-cloud/60">
        {icon}
        <span className="font-mono text-[10px] uppercase tracking-wider">{label}</span>
      </div>
      <p className="mt-1 font-display text-lg">{value}</p>
    </div>
  );
}
