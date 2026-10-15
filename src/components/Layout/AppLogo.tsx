export function AppLogo() {
  return (
    <div
      className="glass-panel fixed left-3 top-3 z-40 flex items-center gap-2 rounded-full px-3.5 py-2 text-sm shadow-lg shadow-black/20 sm:left-5 sm:top-5"
      aria-label="Meridian"
    >
      <span className="text-base leading-none" aria-hidden>
        🌤️
      </span>
      <span className="font-mono font-semibold tracking-wide text-cloud">Meridian</span>
    </div>
  );
}
