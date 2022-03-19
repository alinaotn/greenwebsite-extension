module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'white': '#ffffff',
      'offwhite': '#F3F5F6',
      'lightblue': '#ECEFF1',
      'blue': '#9FB1BA',
      'green': '#67837E',
      'lightgreen': '#759051',
      'red': '#D09887',
      'yellow': '#F0C97F',
      'dark-green': '#0C3B2E',
      'mint': '#E2F0DA',
    },
    borderRadius: {
      'medium': '10px',
      'large': '25px',
    },
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/public/background.svg')",
      },
      width: {
        '320': '320px',
        '400': '400px',
        '450': '450px',
      },
      height: {
        '550': '550px',
      }
    },
  },
  plugins: [],
}
