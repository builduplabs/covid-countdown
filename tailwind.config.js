// See https://tailwindcss.com/docs/configuration for details
module.exports = {
  purge: {
    content: ['./src/**/*.js'],
    options: {
      whitelistPatterns: [/^bg-/, /^text-/, /^hover:text-/],
    },
  },
  theme: {
    extend: {
      screens: {
        dark: { raw: '(prefers-color-scheme: dark)' },
        landscape: {
          raw: '(orientation: landscape) and (max-device-height: 420px)',
        },
      },
      fontFamily: {
        grotesk: ['SpaceGrotesk', 'Helvetica', 'Arial', 'sans'],
        montserrat: ['Montserrat', 'Helvetica', 'Arial', 'sans'],
        source: ['SourceSansPro', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        'accent-red': '#E74536',
        'accent-blue': '#3F43AD',
        background: '#F6F6F6',
        accent: '#FD664C',
        'gray-dark': '#808285',
        'gray-normal': '#A7A9AC',
        'gray-light': '#D1D3D4',
      },
    },
    screens: {
      xxs: '321px',
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    fontSize: {
      xxxs: '.5rem',
      xxs: '.65rem',
      xs: '.75rem',
      sm: '.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '5.5xl': '3.5rem',
      '6xl': '4rem',
      '7xl': '5rem',
      '8xl': '6rem',
    },
    maxWidth: {
      none: 'none',
      xs: '20rem',
      sm: '24rem',
      md: '28rem',
      lg: '32rem',
      xl: '36rem',
      '2xl': '42rem',
      '3xl': '48rem',
      '4xl': '56rem',
      '5xl': '64rem',
      '6xl': '72rem',
      full: '100%',
      vw75: '75vw',
      vw70: '70vw',
      vw65: '65vw',
      vw60: '60vw',
    },
    maxHeight: {
      '0': '0',
      '1/4': '25vh',
      '1/2': '50vh',
      '3/4': '75vh',
      full: '100%',
      screen: '100vh',
    },
    minHeight: {
      '0': '0',
      '1/4': '25vh',
      '1/2': '50vh',
      '3/4': '75vh',
      full: '100%',
      screen: '100vh',
    },
  },
  variants: {},
  // https://github.com/tailwindcss/custom-forms
  plugins: [require('@tailwindcss/custom-forms')],
};
