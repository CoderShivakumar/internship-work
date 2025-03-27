/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        fontFamily: {
          mukta: ['Mukta', 'sans-serif'],
          nunito: ['Nunito Sans', 'sans-serif'],
          oswald: ['Oswald', 'sans-serif'],
        },
      },
    },
    plugins: [],
  };