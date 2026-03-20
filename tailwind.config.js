/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        luxury: ['CsGlodive', 'serif'],
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        'brand-navy': '#1B1F3B',
        'brand-gold': '#D4AF37',
        'brand-gold-hover': '#C49F2E',
        'brand-gray': '#F0F0F0',
        'brand-charcoal': '#2C2C2C',
      },
    },
  },
  plugins: [],
};