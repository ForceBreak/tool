// ./tailwind.config.js

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    fontFamily: {
      sans: ['Ilisarniq', 'sans-serif'],
      mono: ['IBM Plex Mono', 'mono'],
    },
    extend: {
      lineHeight: {
        '11': '2.75rem',
        '12': '3rem',
        '16': '4rem'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: []
}