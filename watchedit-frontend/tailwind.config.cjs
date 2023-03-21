/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary' : '#2E86AB',
        'background' : '#201E1F',
        'backgroundOffset' : '#2d2a2c',
        'backgroundOffset2' : '#474345'
      }
    },
  },
  plugins: [],
}
