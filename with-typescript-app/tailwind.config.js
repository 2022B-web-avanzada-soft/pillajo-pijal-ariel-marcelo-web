/** @type {import('tailwindcss').Config} */
const konstaConfig = require('konsta/config');
/*tailwind.config.js*/
module.exports = konstaConfig({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
});
