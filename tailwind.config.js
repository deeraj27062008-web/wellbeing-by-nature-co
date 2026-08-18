/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F2F7F4',
          100: '#E1ECE6',
          200: '#C2D9CD',
          300: '#95BEAB',
          400: '#649E86',
          500: '#3D7D65',
          600: '#2A634F',
          700: '#1F4D3D',
          800: '#14362B',
          900: '#0C2820', // Signature deep royal forest
          950: '#051812', // Obsidian emerald
        },
        gold: {
          50: '#FDFBF4',
          100: '#FAF4E3',
          200: '#F4E7BF',
          300: '#EBD494',
          400: '#DFC068',
          500: '#D4AF37', // Signature polished champagne gold
          600: '#B89024',
          700: '#946E19',
          800: '#775417',
          900: '#5F4115',
        },
        warm: {
          50: '#FAF7F2', // Alabaster silk
          100: '#F4EFE6',
          200: '#ECE4D6',
          300: '#DDD2BF',
          400: '#C4B49A',
          500: '#A49275',
        },
        coral: {
          500: '#D95D39',
          600: '#C14B29',
          700: '#9E381A',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        cormorant: ['Cormorant Garamond', 'Georgia', 'serif'],
        cinzel: ['Cinzel', 'Playfair Display', 'serif'],
      },
      boxShadow: {
        'luxe': '0 20px 40px -15px rgba(5, 24, 18, 0.08)',
        'luxe-hover': '0 30px 60px -12px rgba(5, 24, 18, 0.16)',
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.25)',
      }
    },
  },
  plugins: [],
}
