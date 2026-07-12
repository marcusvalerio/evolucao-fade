/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#F6F3EC',
          soft: '#EFEBE1',
        },
        graphite: {
          100: '#E8E6E1',
          300: '#C7C3BA',
          500: '#8B877E',
          700: '#4A473F',
          900: '#2A2823',
        },
        imperio: {
          DEFAULT: '#2F4B3C',
          light: '#3E6350',
          dark: '#1F3329',
          tint: '#EAF0EC',
        },
        leather: {
          DEFAULT: '#7A4B32',
          light: '#9A6440',
        },
        steel: '#B8BCC2',
        wood: '#D9C7A8',
      },
      fontFamily: {
        display: ['"Gabarito"', 'sans-serif'],
        body: ['"Arimo"', 'sans-serif'],
      },
      borderRadius: {
        pill: '999px',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(42,40,35,0.04), 0 8px 24px -8px rgba(42,40,35,0.10)',
        softer: '0 1px 1px rgba(42,40,35,0.03), 0 2px 8px -2px rgba(42,40,35,0.06)',
      },
    },
  },
  plugins: [],
}
