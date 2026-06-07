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
          cream:       '#EDE8DC',
          'cream-light': '#F5F0E8',
          navy:        '#152740',
          'navy-dark': '#0E1C30',
          gold:        '#BF9840',
          'gold-light':'#D4AF5A',
          brown:       '#7A6040',
          'brown-light':'#A0875A',
          blue:        '#6680A8',
          border:      '#D4C8B8',
          muted:       '#9A8A78',
        },
        rating: {
          G:     '#2D6A2D',
          PG:    '#1F5FAB',
          M:     '#B87420',
          MA:    '#A02828',
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
