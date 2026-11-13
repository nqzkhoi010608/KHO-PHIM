import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans:    ['var(--font-sans)',    'DM Sans',        'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Fraunces',       'Georgia',   'serif'],
        mono:    ['var(--font-mono)',    'JetBrains Mono', 'monospace'],
      },
      colors: {
        ink: '#060709',
        inkSoft: '#0A0C0F',
        panel: '#0F1117',
        panelRaised: '#161922',
        panelDeep: '#1D2030',
        line: 'rgba(255,255,255,0.09)',
        lineSoft: 'rgba(255,255,255,0.05)',
        lineStrong: 'rgba(255,255,255,0.14)',
        paper: '#FFFFFF',
        paperDim: '#D0D5DD',
        muted: '#9AA3B0',
        mutedDeep: '#626A76',
        signal: '#FF3B30',
        signalSoft: '#FF6359',
        signalDeep: '#C42A22',
        gold: '#FFC857',
        goldSoft: '#FFDFA0',
      },
      boxShadow: {
        cinema: '0 28px 80px rgba(0, 0, 0, 0.42)',
        card: '0 2px 4px rgba(0,0,0,0.15), 0 12px 36px rgba(0,0,0,0.25)',
        'card-hover': '0 8px 28px rgba(0,0,0,0.35), 0 0 40px rgba(255,59,48,0.18)',
        glow: '0 0 35px rgba(255, 59, 48, 0.22)',
        'glow-strong': '0 0 60px rgba(255, 59, 48, 0.35)',
        'gold-glow': '0 0 25px rgba(255, 200, 87, 0.25)',
        glass: '0 1px 0 rgba(255,255,255,0.05) inset, 0 20px 60px rgba(0,0,0,0.3)',
      },
      transitionTimingFunction: {
        cinema: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
