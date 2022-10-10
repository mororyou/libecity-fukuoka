/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        themeMainColor: '#3550D4',
        themeBgColor: '#F4FAFA',
        themeBtnColor: '#E9546B',
        themeTitleText: '#333333',
        themeDetailBgColor: '#DBDEE1',
      },
    },
  },
  plugins: [],
  important: true,
}
