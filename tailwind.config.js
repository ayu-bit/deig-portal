/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./contexts/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#1075BB',
        primaryDark: '#0D5D95',
        accentStrong: '#F27D26',
        accentHover: '#D96D1F',
        danger: '#E11D48',
        lightBg: '#F8FAFC',
        textDark: '#0F172A',
        textLight: '#F1F5F9',
        goldAccent: '#FACC15',
        surface: '#FFFFFF',
        surfaceDark: '#1E293B',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Space Grotesk', 'Montserrat', 'sans-serif'],
        'nyala': ['Nyala', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
