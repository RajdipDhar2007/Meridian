import { useMemo } from 'react';

export function StarField() {
  const stars = useMemo(
    () =>
      Array.from({ length: 90 }, () => ({
        top: `${Math.random() * 70}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 1.8 + 0.6,
        delay: `${Math.random() * 4}s`,
        duration: `${2 + Math.random() * 3}s`,
      })),
    [],
  );

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute animate-twinkle rounded-full bg-white"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
            animationDuration: s.duration,
          }}
        />
      ))}
      <div
        className="absolute right-[12%] top-[8%] h-16 w-16 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(245,247,250,0.9) 0%, rgba(245,247,250,0.15) 60%, transparent 100%)',
          boxShadow: '0 0 60px 12px rgba(245,247,250,0.25)',
        }}
      />
    </div>
  );
}
