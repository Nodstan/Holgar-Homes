/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-navy': '#1B1F3B',
        'brand-gold': '#D4AF37',
        'brand-gold-hover': '#C49F2E',
        'brand-gray': '#F0F0F0',
        'brand-charcoal': '#2C2C2C',
        // Back-compat for existing code
        'luxury-gold': '#D4AF37',
        'luxury-gold-hover': '#C49F2E',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        luxury: ['CsGlodive', 'serif'],
      },
    },
  },
  plugins: [],
};