/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0A1B2A',
          800: '#102A43',
          700: '#1B3C5E',
          600: '#25507B',
        },
        primary: {
          DEFAULT: '#174EA6',
          dark: '#10397B',
          light: '#2862C8',
        },
        accent: {
          DEFAULT: '#3478F6',
          gold: '#D6AD60',
          'gold-light': '#E8CA8C',
          'gold-dark': '#B58C3E',
        },
        surface: {
          bg: '#F5F8FC',
          card: '#FFFFFF',
          muted: '#EBF1F7',
        },
        content: {
          primary: '#172B4D',
          secondary: '#62748A',
          muted: '#8F9CAE',
        },
        status: {
          success: '#16845B',
          error: '#C63D46',
          warning: '#D97706',
          info: '#2563EB',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 2px 8px -2px rgba(16, 42, 67, 0.08), 0 1px 4px -1px rgba(16, 42, 67, 0.04)',
        'premium': '0 10px 30px -5px rgba(16, 42, 67, 0.1), 0 4px 12px -2px rgba(16, 42, 67, 0.05)',
      }
    },
  },
  plugins: [],
}
