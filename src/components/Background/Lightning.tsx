import { useMemo } from 'react';

export function Lightning() {
  const flashes = useMemo(
    () =>
      Array.from({ length: 2 }, () => ({
        duration: `${6 + Math.random() * 5}s`,
        delay: `${-Math.random() * 8}s`,
      })),
    [],
  );

  const bolt = useMemo(
    () => ({
      left: `${20 + Math.random() * 60}%`,
      duration: flashes[0]?.duration ?? '7s',
      delay: flashes[0]?.delay ?? '0s',
    }),
    [flashes],
  );

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {flashes.map((f, i) => (
        <div
          key={i}
          className="absolute inset-0 animate-flash bg-[#E8ECFF]"
          style={{ animationDuration: f.duration, animationDelay: f.delay }}
        />
      ))}
      <svg
        className="absolute top-0 h-2/3 w-24 animate-flash opacity-0"
        style={{ left: bolt.left, animationDuration: bolt.duration, animationDelay: bolt.delay }}
        viewBox="0 0 40 120"
      >
        <path
          d="M 22 0 L 8 55 L 20 55 L 4 120 L 34 45 L 20 45 Z"
          fill="#F5F7FA"
          opacity="0.9"
        />
      </svg>
    </div>
  );
}
