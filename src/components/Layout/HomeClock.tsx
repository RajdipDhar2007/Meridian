import { LocateFixed, Loader2 } from 'lucide-react';
import { useClock } from '@/hooks/useClock';

export function HomeClock({ onLocate, locating }: { onLocate: () => void; locating: boolean }) {
  const { time } = useClock(undefined, 1000);

  return (
    <button
      onClick={onLocate}
      title="Jump back to your current location"
      aria-label="Return to my current location"
      className="glass-panel fixed right-3 top-3 z-40 flex items-center gap-2 rounded-full px-3.5 py-2 text-sm shadow-lg shadow-black/20 transition hover:bg-white/10 sm:right-5 sm:top-5"
    >
      {locating ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin text-brass" aria-hidden />
      ) : (
        <LocateFixed className="h-3.5 w-3.5 text-brass" aria-hidden />
      )}
      <span className="font-mono tabular-nums">{time}</span>
    </button>
  );
}
