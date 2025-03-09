/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          primary: '#2C5F2D',    // Deep forest green
          secondary: '#97BC62',  // Light moss green
          accent: '#FFB30F',     // Golden sunlight 
          dark: '#1E3F20',       // Dark forest shade
          light: '#C2E7C9',      // Light foliage
        }
      },
      fontSize: {
        'icon-sm': '1rem',      // 16px
        'icon-md': '1.5rem',    // 24px
        'icon-lg': '2rem',      // 32px
      },
      width: {
        'icon-sm': '1rem',
        'icon-md': '1.5rem',
        'icon-lg': '2rem',
      },
      height: {
        'icon-sm': '1rem',
        'icon-md': '1.5rem',
        'icon-lg': '2rem',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 }
        }
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      }
    },
  },
  plugins: [],
}