import { motion } from 'framer-motion';
import { Compass, MapPin, Search } from 'lucide-react';

export function LoadingScreen({ label }: { label: string }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-ink text-cloud">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2.4, ease: 'linear' }}
        className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-brass/60"
      >
        <Compass className="h-7 w-7 text-brass" aria-hidden />
      </motion.div>
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-cloud/60">{label}</p>
    </div>
  );
}

export function LocationPrompt({
  onAllow,
  onManual,
  denied,
}: {
  onAllow: () => void;
  onManual: () => void;
  denied: boolean;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-ink px-6 text-center text-cloud">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-glass-border bg-glass">
        <MapPin className="h-7 w-7 text-brass" aria-hidden />
      </div>
      <div className="max-w-sm space-y-2">
        <h1 className="font-display text-2xl">
          {denied ? 'Location access is off' : 'Find your local sky'}
        </h1>
        <p className="text-sm text-cloud/70">
          {denied
            ? 'Meridian can still work — search for a city manually below, or enable location access in your browser settings.'
            : 'Share your position for instant, precise conditions — or search for a city instead.'}
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        {!denied && (
          <button
            onClick={onAllow}
            className="rounded-full bg-brass px-6 py-2.5 text-sm font-semibold text-ink transition hover:brightness-110"
          >
            Use my location
          </button>
        )}
        <button
          onClick={onManual}
          className="flex items-center justify-center gap-2 rounded-full border border-glass-border bg-glass px-6 py-2.5 text-sm font-medium text-cloud transition hover:bg-white/10"
        >
          <Search className="h-4 w-4" aria-hidden />
          Search for a city 🔎
        </button>
      </div>
    </div>
  );
}
