const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#ff9c00',
        'primary-light': '#FFF0D9',
        secondary: '#432a43',
        accent: '#5ecddd',
        'transparent-black': 'rgba(0, 0, 0, 0.5)'
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
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
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
