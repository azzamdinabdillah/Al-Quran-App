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
        "biru-terang": "#672CBC",
        "primary-blue": "#542E71",
        "dark-blue": "#240F4F",
        "biru-tua": "#403D58",
        "biru-muda": "#5BC0EB",
        "light-gray": "#8789A3",
      },
      fontFamily:{
        "arabic": ["Scheherazade New", "serif"]
      }
    },
  },
  plugins: [],
}
