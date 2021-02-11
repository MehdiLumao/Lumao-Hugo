const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#ff9c00',
        'transparent-black': 'rgba(0, 0, 0, 0.5)'
      },
      minHeight: {
        '600': '600px'
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      }
    }
  },
  variants: {
    extend: {
      display: ['group-hover'],
      margin: ['hover'],
      borderWidth: ['hover']
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')
  ]
}
