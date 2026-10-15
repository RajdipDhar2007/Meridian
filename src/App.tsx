import { useEffect, useMemo, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { ErrorBoundary } from '@/components/Layout/ErrorBoundary';
import { LoadingScreen, LocationPrompt } from '@/components/Layout/LoadingScreen';
import { HomeClock } from '@/components/Layout/HomeClock';
import { AppLogo } from '@/components/Layout/AppLogo';
import { DynamicBackground } from '@/components/Background/DynamicBackground';
import { CurrentWeatherHero } from '@/components/CurrentWeather/CurrentWeatherHero';
import { HourlyForecast } from '@/components/Forecast/HourlyForecast';
import { WeeklyForecast } from '@/components/Forecast/WeeklyForecast';
import { WindCompass } from '@/components/Instruments/WindCompass';
import { UVMeter } from '@/components/Instruments/UVMeter';
import { PressureGauge } from '@/components/Instruments/PressureGauge';
import { HumidityFill } from '@/components/Instruments/HumidityFill';
import { AQIIndicator } from '@/components/Instruments/AQIIndicator';
import { SunArc } from '@/components/Instruments/SunArc';
import { MoonArc } from '@/components/Instruments/MoonArc';
import { SearchBar } from '@/components/Search/SearchBar';
import { LocationMap } from '@/components/Map/LocationMap';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useWeather } from '@/hooks/useWeather';
import { conditionGroup } from '@/utils/weatherCode';
import { resolveTheme, resolveTimeOfDay } from '@/utils/theme';
import { nowAtTimezone, parseLocalAsUTC } from '@/utils/time';

export default function App() {
  const geo = useGeolocation();
  const { bundle, loading, error, loadLocation, loadFallback, refresh, recents } = useWeather();
  const [stage, setStage] = useState<'prompt' | 'resolving' | 'ready'>('prompt');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (geo.status === 'granted' && geo.coords) {
      setStage('resolving');
      import('@/services/geocoding').then(({ reverseGeocode }) =>
        reverseGeocode(geo.coords!.latitude, geo.coords!.longitude).then((loc) => {
          void loadLocation(loc, false);
          setStage('ready');
        }),
      );
    } else if (geo.status === 'denied' || geo.status === 'error' || geo.status === 'unsupported') {
      setStage((s) => (s === 'ready' ? s : 'prompt'));
    }
  }, [geo.status, geo.coords, loadLocation]);

  const [minuteTick, setMinuteTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setMinuteTick((n) => n + 1), 60 * 1000);
    return () => clearInterval(id);
  }, []);
  const now = useMemo(() => nowAtTimezone(bundle?.location.timezone), [bundle, minuteTick]);

  const theme = useMemo(() => {
    if (!bundle) return resolveTheme('clear', 'afternoon');
    const group = conditionGroup(bundle.current.weatherCode);
    const timeOfDay = resolveTimeOfDay({
      now,
      sunrise: parseLocalAsUTC(bundle.daily[0].sunrise),
      sunset: parseLocalAsUTC(bundle.daily[0].sunset),
    });
    return resolveTheme(group, timeOfDay);
  }, [bundle, now]);

  async function handleRefresh() {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  }

  const showPrompt = stage === 'prompt' && !bundle;
  const showLoading = (stage === 'resolving' || loading) && !bundle;

  return (
    <ErrorBoundary>
      <DynamicBackground theme={theme} />
      <AppLogo />
      <HomeClock onLocate={geo.request} locating={geo.status === 'locating'} />

      {showPrompt && (
        <LocationPrompt
          denied={geo.status === 'denied' || geo.status === 'unsupported'}
          onAllow={geo.request}
          onManual={() => {
            setStage('ready');
            loadFallback();
          }}
        />
      )}

      {!showPrompt && showLoading && <LoadingScreen label="Reading the sky…" />}

      {!showPrompt && !showLoading && bundle && (
        <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-5 px-4 pb-16 pt-16 sm:px-6 sm:pt-6">
          <SearchBar recents={recents} onSelect={(loc) => void loadLocation(loc)} />

          {error && (
            <div className="glass-panel flex items-center gap-2 rounded-2xl px-4 py-3 text-sm text-cloud/80">
              <AlertTriangle className="h-4 w-4 text-brass" aria-hidden />
              {error}
            </div>
          )}

          <CurrentWeatherHero bundle={bundle} onRefresh={handleRefresh} refreshing={refreshing} />

          <HourlyForecast hours={bundle.hourly} />

          <section className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <WindCompass speed={bundle.current.windSpeed} gusts={bundle.current.windGusts} direction={bundle.current.windDirection} />
            <UVMeter uv={bundle.current.uvIndex} />
            <PressureGauge pressure={bundle.current.pressure} />
            <HumidityFill humidity={bundle.current.humidity} dewPoint={bundle.current.dewPoint} />
            <AQIIndicator air={bundle.airQuality} />
            {bundle.current.isDay ? (
              <SunArc sunrise={bundle.daily[0].sunrise} sunset={bundle.daily[0].sunset} now={now} />
            ) : (
              <MoonArc now={now} daily={bundle.daily} />
            )}
          </section>

          <WeeklyForecast days={bundle.daily} />

          <LocationMap location={bundle.location} onLocationChange={(loc) => void loadLocation(loc)} />

          <footer className="pt-4 text-center font-mono text-[11px] text-cloud/40">
          A <span className="font-bold text-[#d4af37] drop-shadow-[0_0_6px_rgba(212,175,55,0.75)]">RAJDIP DHAR</span> PROJECT
          </footer>
        </main>
      )}
    </ErrorBoundary>
  );
}
