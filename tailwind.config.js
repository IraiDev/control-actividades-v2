module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxHeight: {
        '0': '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75vh',
        'card': '176px'
      },
      minWidth: {
        '0': '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
        'table': '1536px',
        'sd-br': '370px',
        'sd-br-mobile': '320px',
      },
      screens: {
        '3xl': '1800px'
      }
    },
    fontSize: {
      'xs': '.75rem',
      '2xs': '.815rem',
      'sm': '.875rem',
      'tiny': '.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
    },
    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
      '8': '8px',
    },
    zIndex: {
      '0': 0,
      '10': 10,
      '20': 20,
      '30': 30,
      '40': 40,
      '50': 50,
      '25': 25,
      '75': 75,
      '100': 100,
      '1000': 1000,
      '1100': 1100,
      '1200': 1200,
      'auto': 'auto',
    },
    minHeight: {
      '0': '0',
      'sd-br': '700',
      'full': '100%',
      'screen': '100vh'
    },
    screens: {
      'mobile': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  },
  variants: {
    extend: {
    },
  },
  plugins: [],
}
