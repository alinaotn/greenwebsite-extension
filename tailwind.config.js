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
                '100': '100px',
                '130': '130px',
                '135': '135px',
                '320': '320px',
                '400': '400px',
                '450': '450px',
            },
            height: {
                '100': '100px',
                '130': '130px',
                '135': '135px',
                '550': '550px',
                '250': '250px',
            },
            margin: {
                '60px': '60px',
            },
            borderRadius: {
                '50': '50%',
            },
            borderWidth: {
                '3': '3px',
            }
        },
    },
    plugins: [],
}
