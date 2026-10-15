import { useEffect, useRef } from 'react';

type ParticleKind = 'rain' | 'snow' | 'fog';

interface Particle {
  x: number;
  y: number;
  length: number;
  speed: number;
  drift: number;
  size: number;
  opacity: number;
}

interface FieldProps {
  kind: ParticleKind;
  isNight: boolean;
  intensity?: 'light' | 'heavy';
}

const BASE_COUNT: Record<ParticleKind, number> = {
  rain: 240,
  snow: 150,
  fog: 40,
};

export function ParticleField({ kind, isNight, intensity = 'heavy' }: FieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = (canvas.width = canvas.offsetWidth * devicePixelRatio);
    let height = (canvas.height = canvas.offsetHeight * devicePixelRatio);
    ctx.scale(devicePixelRatio, devicePixelRatio);

    const intensityMult = kind === 'rain' && intensity === 'light' ? 0.45 : 1;
    const count = Math.round((reduceMotion ? BASE_COUNT[kind] / 4 : BASE_COUNT[kind]) * intensityMult);

    // Rain/snow read darker & slower-feeling at night; brighter & crisper by day.
    const rainColor = isNight ? '190,200,222' : '210,225,245';
    const snowColor = isNight ? '210,216,235' : '255,255,255';
    const fogColor = isNight ? '150,156,172' : '224,228,236';

    const particles: Particle[] = Array.from({ length: count }, () => makeParticle(kind, width, height));

    function makeParticle(k: ParticleKind, w: number, h: number): Particle {
      if (k === 'rain') {
        return {
          x: Math.random() * (w / devicePixelRatio),
          y: Math.random() * (h / devicePixelRatio),
          length: 12 + Math.random() * 16,
          speed: 10 + Math.random() * 8,
          drift: -1.4,
          size: 1,
          opacity: (isNight ? 0.2 : 0.3) + Math.random() * 0.3,
        };
      }
      if (k === 'snow') {
        return {
          x: Math.random() * (w / devicePixelRatio),
          y: Math.random() * (h / devicePixelRatio),
          length: 0,
          speed: 0.6 + Math.random() * 1.4,
          drift: (Math.random() - 0.5) * 0.6,
          size: 1.5 + Math.random() * 2.5,
          opacity: (isNight ? 0.35 : 0.45) + Math.random() * 0.45,
        };
      }
      return {
        x: Math.random() * (w / devicePixelRatio),
        y: Math.random() * (h / devicePixelRatio) * 0.7,
        length: 80 + Math.random() * 160,
        speed: 0.1 + Math.random() * 0.15,
        drift: 0,
        size: 20 + Math.random() * 20,
        opacity: (isNight ? 0.04 : 0.06) + Math.random() * 0.07,
      };
    }

    let raf = 0;
    function resize() {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * devicePixelRatio;
      height = canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx!.scale(devicePixelRatio, devicePixelRatio);
    }

    function tick() {
      const w = width / devicePixelRatio;
      const h = height / devicePixelRatio;
      ctx!.clearRect(0, 0, w, h);

      for (const p of particles) {
        if (kind === 'rain') {
          ctx!.strokeStyle = `rgba(${rainColor},${p.opacity})`;
          ctx!.lineWidth = 1;
          ctx!.beginPath();
          ctx!.moveTo(p.x, p.y);
          ctx!.lineTo(p.x + p.drift * 4, p.y + p.length);
          ctx!.stroke();
          p.y += p.speed;
          p.x += p.drift;
          if (p.y > h) {
            p.y = -p.length;
            p.x = Math.random() * w;
          }
        } else if (kind === 'snow') {
          ctx!.fillStyle = `rgba(${snowColor},${p.opacity})`;
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx!.fill();
          p.y += p.speed;
          p.x += p.drift + Math.sin(p.y * 0.01) * 0.3;
          if (p.y > h) {
            p.y = -4;
            p.x = Math.random() * w;
          }
        } else {
          ctx!.fillStyle = `rgba(${fogColor},${p.opacity})`;
          ctx!.beginPath();
          ctx!.ellipse(p.x, p.y, p.length, p.size, 0, 0, Math.PI * 2);
          ctx!.fill();
          p.x += p.speed;
          if (p.x - p.length > w) p.x = -p.length;
        }
      }

      raf = requestAnimationFrame(tick);
    }

    if (!reduceMotion) {
      raf = requestAnimationFrame(tick);
    } else {
      tick();
    }

    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [kind, isNight, intensity]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />;
}
