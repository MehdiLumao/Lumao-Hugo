const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#ff9c00',
        'primary-light': '#FFF0D9',
        secondary: '#432a43',
        accent: '#5ecddd',
        'accent-light': '#e0fcf8',
        'transparent-black': 'rgba(0, 0, 0, 0.5)',
        gray: colors.trueGray
      },
      height: {
        '600': '600px'
      },
      minHeight: {
        '600': '600px',
        '920': '920px'
      },
      maxHeight: {
        '1080': '1080px'
      },
      boxShadow: {
        theme: '0 23px 154px -20px rgba(197, 197, 197, 0.66)'
      },
      zIndex: {
        '-1': '-1',
      },
      fontFamily: {
        sans: ['Open sans', ...defaultTheme.fontFamily.sans],
      }
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
