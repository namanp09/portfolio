/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#0B0F19',
        surface: '#111827',
        'surface-2': '#161E2E',
        border: 'rgba(148,163,184,0.12)',
        purple: {
          DEFAULT: '#8B5CF6',
          soft: '#A78BFA',
          dim: '#6D28D9',
        },
        cyan: {
          DEFAULT: '#22D3EE',
          soft: '#67E8F9',
          dim: '#0E7490',
        },
        ink: '#F8FAFC',
        muted: '#94A3B8',
        faint: '#5B6577',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(to bottom, transparent, #0B0F19 85%), linear-gradient(rgba(148,163,184,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.07) 1px, transparent 1px)',
        'glow-purple-cyan':
          'radial-gradient(circle at 20% 20%, rgba(139,92,246,0.25), transparent 45%), radial-gradient(circle at 80% 30%, rgba(34,211,238,0.18), transparent 40%)',
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(139,92,246,0.45)',
        'glow-cyan': '0 0 40px -10px rgba(34,211,238,0.4)',
        card: '0 8px 30px -12px rgba(0,0,0,0.5)',
      },
      animation: {
        blob: 'blob 18s infinite ease-in-out',
        'blob-slow': 'blob 26s infinite ease-in-out',
        marquee: 'marquee 30s linear infinite',
        'caret-blink': 'caret 1s step-end infinite',
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -40px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 25px) scale(0.95)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        caret: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
