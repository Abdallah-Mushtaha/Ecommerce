/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        main: '#0090f0',
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
      images: {
        with: '100%',
      },

    },
  },
  plugins: [],
}

