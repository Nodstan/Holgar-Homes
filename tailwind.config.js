/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-navy': '#1B1F3B',
        'brand-gold': '#D4AF37',
        'brand-gray': '#F0F0F0',
        'brand-charcoal': '#2C2C2C',
      },
    },
  },
  plugins: [],
};

