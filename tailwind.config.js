/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        themeMainColor: '#384860',
        themeBgColor: '#e8f5f5',
      },
    },
  },
  plugins: [],
  important: true,
}
