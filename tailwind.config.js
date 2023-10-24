/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          '0%': {
            opacity: '0'
          },
          '100%': {
            opacity: '1'
          }
        }
      },
      container: {
        center: true,
        padding: '1rem'
      },
      colors: {
        base: {
          100: 'var(--color-base-100)'
        }
      }
    }
  },
  plugins: []
};
