/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#0b1220',
          800: '#131c2f',
          700: '#1b263b',
        },
        brand: {
          700: '#1d4ed8',
          600: '#2563eb',
          500: '#3b82f6',
        },
        mist: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5f5',
        },
        ocean: {
          500: '#2ec4b6',
          600: '#21a79a',
        },
        amber: {
          500: '#f59e0b',
          600: '#d97706',
        },
      },
      boxShadow: {
        soft: '0 12px 30px rgba(15, 23, 42, 0.12)',
        lift: '0 18px 45px rgba(15, 23, 42, 0.18)',
        glow: '0 10px 30px rgba(37, 99, 235, 0.2)',
      },
      fontFamily: {
        display: ['"Sora"', 'system-ui', 'sans-serif'],
        body: ['"Sora"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
