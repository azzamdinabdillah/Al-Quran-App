/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary-blue": "#672CBC",
        "dark-blue": "#240F4F",
        "light-gray": "#8789A3",
      },
      fontFamily:{
        "arabic": ["Amiri", "serif"]
      }
    },
  },
  plugins: [],
}
