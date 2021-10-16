// ./tailwind.config.js

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    fontFamily: {
      sans: ['Illisarniq', 'sans-serif'],
      mono: ['IBM Plex Mono', 'mono'],
    },
    extend: {
      lineHeight: {
        '12': '3rem'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: []
}