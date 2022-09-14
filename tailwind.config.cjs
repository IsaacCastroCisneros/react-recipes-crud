/** @type {import('tailwindcss').Config} */
module.exports = {
  mode:'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:
      {
        title:'rgb(37, 37, 37)',
        subtitle:'rgb(170, 170, 170)',
        text:'rgb(107, 107, 107)',
        background:'rgb(221, 221, 221)',
        primary:'rgb(103, 7, 192)'
      }
    },
  },
  plugins: [],
}
