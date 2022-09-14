const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')
const { spacing } = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#ff9c00',
        'primary-light': '#FFF0D9',
        secondary: '#432a43',
        'secondary-dark': '#331f33',
        accent: '#5ecddd',
        'accent-light': '#e0fcf8',
        'transparent-black': 'rgba(0, 0, 0, 0.5)',
        'gradient-dark': '#0098c7',
        'gradient-light': '#0de9c9',
        gray: colors.trueGray,
        'gray-theme': {
          900: '#181818',
          800: '#202020',
          750: '#242424',
          700: '#2b2b2b',
          600: '#3e3e3e',
          100: '#f5f5f5'
        }
      },
      minWidth: {
        '350': '350px'
      },
      maxWidth: {
        48: spacing['48']
      },
      width: {
        '3xl': '48rem',
      },
      height: {
        '600': '600px',
        '650': '650px',
        '700': '700px',
        '750': '750px',
      },
      minHeight: {
        '600': '600px',
        '920': '920px'
      },
      maxHeight: {
        '400': '400px',
        '1080': '1080px',
        36: spacing['36']
      },
      boxShadow: {
        theme: '0 23px 154px -20px rgba(197, 197, 197, 0.66)',
        lg: '0 32px 34px -14px rgba(128, 130, 145, 0.33)',
        'inset-white': 'inset 0px 0px 0px 20px #fff',
      },
      zIndex: {
        '-1': '-1',
      },
      fontFamily: {
        sans: ['Open sans', ...defaultTheme.fontFamily.sans],
        accent: ['Gilroy']
      },
      borderRadius: {
        '4xl': '2.2rem'
      },
      letterSpacing: {
        widest: '.30em',
      },
      screens: {
        'xs': '550px',
        '3xl': '1650px',
      },
      fontSize: {
        '10xl': ['8.75rem'], //140px
      },
    }
  },
  variants: {
    extend: {
      display: ['group-hover'],
      margin: ['hover', 'last'],
      borderWidth: ['hover'],
      width: ['group-hover'],
      boxShadow: ['first', 'last']
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')
  ]
}
