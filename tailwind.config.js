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
          primary: '#00FF80',    // Bright green (for primary elements)
          secondary: '#8A2BE2',  // Vibrant purple (for secondary elements)
          accent: '#00FFFF',     // Cyan (for accents)
          dark: '#071507',       // Very dark green (for backgrounds)
          light: '#7DF9FF',      // Light cyan (for highlights)
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
          '0%, 100%': { opacity: 0.6 },
          '50%': { opacity: 1 }
        },
        glow: {
          '0%, 100%': { textShadow: '0 0 15px rgba(0, 255, 128, 0.7)' },
          '50%': { textShadow: '0 0 25px rgba(0, 255, 128, 0.9)' }
        }
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        glow: 'glow 3s infinite ease-in-out'
      }
    },
  },
  plugins: [],
}