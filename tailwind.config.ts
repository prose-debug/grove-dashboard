import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'sidebar-bg': 'var(--sidebar-bg)',
        'sidebar-border': 'var(--sidebar-border)',
        'sidebar-active': 'var(--sidebar-active)',
        'sidebar-hover': 'var(--sidebar-hover)',
        'card-bg': 'var(--card-bg)',
        'card-border': 'var(--card-border)',
        'badge-green': 'var(--badge-green)',
        'badge-red': 'var(--badge-red)',
        'badge-yellow': 'var(--badge-yellow)',
        'badge-blue': 'var(--badge-blue)',
        'badge-gray': 'var(--badge-gray)',
      },
    },
  },
  plugins: [],
};

export default config;
