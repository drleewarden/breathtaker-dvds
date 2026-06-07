import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: '#D4AF37',
          'gold-light': '#F0D060',
          dark: '#0D1117',
          surface: '#161B22',
          border: '#30363D',
          text: '#E6EDF3',
          muted: '#8B949E',
        },
        rating: {
          G: '#238636',
          PG: '#1F6FEB',
          M: '#E3A020',
          MA: '#DA3633',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
