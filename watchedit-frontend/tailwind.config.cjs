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
        'background' : '#191818',
        'backgroundOffset' : '#201E1F',
        'backgroundOffset2' : '#2d2a2c',
        'success' : '#84DD63'
      },
      gridTemplateColumns: {
        '24': 'repeat(24, minmax(0, 1fr))',
        '16': 'repeat(16, minmax(0, 1fr))',
      },
      gridColumn: {
        'span-16': 'span 16 / span 16',
        'span-19': 'span 19 / span 19',
        'span-22': 'span 22 / span 22',
        'span-23': 'span 23 / span 23',
        'span-24': 'span 24 / span 24',
      }
    },
  },
  plugins: [],
}
