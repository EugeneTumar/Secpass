/** @type {import('tailwindcss').Config} */

const tailwindUtils = require('@dead404code/tailwind-utilities');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom': {
          1: '#0E0429',
          2: '#272136',
          3: '#7D8CAD',
          4: '#AC4F7D',
          5: '#8EB353',
          6: '#B8A955',
        },
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
      },
      animation: {
        shake: 'shake 0.5s ease-in-out forwards',
      },
    },
  },
  plugins: [
    tailwindUtils,
  ],
}