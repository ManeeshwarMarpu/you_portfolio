/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ytbg: { DEFAULT: '#0f0f0f', card: '#1f1f1f', hover: '#272727' },
      },
      boxShadow: { soft: '0 6px 20px rgba(0,0,0,0.15)' },
    },
  },
  plugins: [],
}
