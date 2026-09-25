/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        theme: {
          burgundy: '#800020',
          cream: '#F3E6D5',
          offwhite: '#FFF9F2',
          coral: '#D45060',
          burgundyDark: '#1A0408',
          burgundySurface: '#2C0911',
          burgundyBorder: '#541523',
          coralLight: '#E57381',
          coralDark: '#B83647',
          creamLight: '#FAF4EC',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 24px -4px rgba(128, 0, 32, 0.08), 0 2px 8px -2px rgba(128, 0, 32, 0.04)',
        'soft-dark': '0 4px 24px -4px rgba(0, 0, 0, 0.6), 0 2px 8px -2px rgba(0, 0, 0, 0.4)',
        'glow-coral': '0 0 25px -4px rgba(212, 80, 96, 0.45)',
        'glow-burgundy': '0 0 25px -4px rgba(128, 0, 32, 0.35)',
      },
    },
  },
  plugins: [],
};
