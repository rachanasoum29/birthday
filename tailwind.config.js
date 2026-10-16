/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}"
  ],
  theme: {
    extend: {
      fontFamily: {
        fredoka: ['Fredoka', 'sans-serif'],
        pacifico: ['Pacifico', 'cursive'],
        nunito: ['Nunito', 'sans-serif'],
      },
      colors: {
        pastelPink: '#FFD6E0',
        pastelPeach: '#FFE4D6',
        pastelLilac: '#E8DFF5',
        pastelMint: '#C9E4DE',
        pastelYellow: '#FCF5C7',
        candyPink: '#FF6B8B',
        candyRose: '#FA5282',
        candyPurple: '#9B5DE5',
        softViolet: '#7E69AB',
        butterYellow: '#FFF1C5',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg)' },
        },
        flicker: {
          '0%': { transform: 'scale(1) skewX(-2deg)', opacity: '0.92' },
          '100%': { transform: 'scale(1.18) skewX(2.5deg)', opacity: '1' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(4deg)' },
        },
        cassetteSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      },
      animation: {
        'float-slow': 'floatSlow 4s ease-in-out infinite',
        'flicker': 'flicker 0.18s ease-in-out infinite alternate',
        'wiggle': 'wiggle 1.2s ease-in-out infinite',
        'cassette-spin': 'cassetteSpin 2.5s linear infinite',
      }
    },
  },
  plugins: [],
}
