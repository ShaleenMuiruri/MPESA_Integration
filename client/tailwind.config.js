/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        mpesa: {
          green: '#22a652',
          dark: '#0b5d2a'
        }
      }
    },
  },
  plugins: [],
}


