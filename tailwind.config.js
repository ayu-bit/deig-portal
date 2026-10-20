/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'brand': {
          blue: {
            50: '#F0F7FC',
            100: '#D9EBF8',
            200: '#B3D6F0',
            300: '#8CC0E9',
            400: '#66AAE1',
            500: '#1075BB',
            600: '#0D629E',
            700: '#0A4E7E',
            800: '#073A5E',
            900: '#04263D',
            DEFAULT: '#1075BB'
          },
          green: {
            50: '#F0F7FC',
            100: '#D9EBF8',
            200: '#B3D6F0',
            300: '#8CC0E9',
            400: '#66AAE1',
            500: '#1075BB', 
            600: '#0D629E',
            700: '#0A4E7E',
            800: '#073A5E',
            900: '#04263D',
            DEFAULT: '#1075BB'
          },
          dark: '#04253D',
          light: '#FFFFFF',
        },
        'brand-blue': {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#1075BB', // Primary DEIG Blue
          600: '#0C568C',
          700: '#094570',
          800: '#073656',
          900: '#04253D',
        }
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        'roboto-condensed': ['Roboto Condensed', 'sans-serif'],
        verdana: ['Verdana', 'Geneva', 'sans-serif'],
        'nokia-pure': ['"Nokia Pure Headline"', 'Arial', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
      }
    },
  },
  plugins: [],
}


