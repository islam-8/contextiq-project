/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        bg: {
          0: '#020408', 1: '#080d14', 2: '#0d1520',
          3: '#111c2d', 4: '#162236',
        },
        border: {
          0: '#1a2535', 1: '#1f2d42', 2: '#263448', 3: '#2d3d52',
        },
      },
      animation: {
        'fade-in': 'fadeIn .25s ease',
        'slide-in': 'slideIn .3s ease',
        'pulse-slow': 'pulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};