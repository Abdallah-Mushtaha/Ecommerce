/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        main: '#000',
        p: '#7b7b7b',
        bg: '#f3f3f3',
        white: '#ffffff',
        heading: '#253237',
        border: '#d6d6d6d5',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        dmsans: ['DM Sans', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 6s linear infinite',
        'spin-reverse-slow': 'spin-reverse 8s linear infinite',
      },
      keyframes: {
        'spin-reverse': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(-360deg)' },
        },
      },
    }
  },
  plugins: [],
}

