/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'seeu-font-normal-black': '#131314',
      },
      columns: {
        'xs': '10rem',
      }
    },
  },
  plugins: [],
}

