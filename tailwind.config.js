/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      current: 'currentColor',
      transparent: 'transparent',
      black: '#000',
      white: '#fff',
      'primary': {
          '50': '#F5FCFB', 
          '100': '#E9F7F4', 
          '200': '#CCEDE5', 
          '300': '#AFE3D4', 
          '400': '#7ACCB1', 
          '500': '#4fb78e', 
          '600': '#41A67A', 
          '700': '#2C8A5E', 
          '800': '#1D6E44', 
          '900': '#10522C', 
          '950': '#063618'
      },  
      'secondary': {
        '50': '#F0F3F5', 
        '100': '#DFE6EB', 
        '200': '#B6C3CC', 
        '300': '#8E9FAD', 
        '400': '#4E5F73', 
        '500': '#1d2636', 
        '600': '#182030', 
        '700': '#101829', 
        '800': '#0B1121', 
        '900': '#060A17', 
        '950': '#02050F'
     },
     'grey': {
        '50': '#FAFCFC', 
        '100': '#F5F7F7', 
        '200': '#E6EBED', 
        '300': '#D8DFE3', 
        '400': '#BAC4CC', 
        '500': '#a0acb7', 
        '600': '#8193A6', 
        '700': '#5A6F8A', 
        '800': '#394F6E', 
        '900': '#203252', 
        '950': '#0D1B36'
      },
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#03230f',
            a: {
              color: '#8193A6',
              '&:hover': {
                color: '#a0acb7',
              },
            },
          },
        },
      },
      boxShadow: {
        'menu': '0 0 60px 20px rgb(0 0 0 / 0.5)'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}


// https://javisperez.github.io/tailwindcolorshades/?gull-gray=a0acb7&jungle-green=4fb78e&dark-blue=0437F2
