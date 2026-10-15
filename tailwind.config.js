/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0B1220',
        cloud: '#F5F7FA',
        brass: '#E8A33D',
        teal: '#2FB8AC',
        dusk: '#5B4B8A',
        glass: 'rgba(255,255,255,0.08)',
        'glass-border': 'rgba(255,255,255,0.18)',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        drift: {
          '0%': { transform: 'translateX(-10%)' },
          '100%': { transform: 'translateX(110%)' },
        },
        fall: {
          '0%': { transform: 'translateY(-10%)', opacity: '0' },
          '10%': { opacity: '1' },
          '100%': { transform: 'translateY(110vh)', opacity: '0.2' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '1' },
        },
        flash: {
          '0%, 96%, 100%': { opacity: '0' },
          '97%': { opacity: '0.9' },
          '98%': { opacity: '0.1' },
          '99%': { opacity: '0.7' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        drift: 'drift 60s linear infinite',
        fall: 'fall 1.2s linear infinite',
        twinkle: 'twinkle 3s ease-in-out infinite',
        flash: 'flash 8s ease-in-out infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
      },
    },
  },
  plugins: [],
};
