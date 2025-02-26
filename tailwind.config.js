/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
        colors: {
            //defining primary color parpal
            primary: {
                50: '#f3e7fe',
                100: '#e1cbfd',
                200: '#cfaffc',
                300: '#bd93fb',
                400: '#ab77fa',
                500: '#995bfa',
                600: '#873ff9',
                700: '#7523f8',
                800: '#6407f7',
                900: '#9333ea',
            },
        },
    },
  },
  plugins: [],
}