/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        royal: {
          green: '#0B2519',
          greenDark: '#05150D',
          greenLight: '#153A29',
          gold: '#D4AF37',
          goldHover: '#E5C158',
          goldMuted: '#F3E5AB',
          goldDark: '#997D20',
          ivory: '#FDFBF7',
          ivoryDark: '#EDE6D8',
          maroon: '#4A0E17',
          maroonLight: '#691422',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Cinzel', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F3E5AB 0%, #D4AF37 50%, #997D20 100%)',
        'emerald-gradient': 'linear-gradient(135deg, #153A29 0%, #0B2519 60%, #05150D 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
        'dark-glass': 'linear-gradient(135deg, rgba(11,37,25,0.85) 0%, rgba(5,21,13,0.95) 100%)',
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(11, 37, 25, 0.15)',
        'luxury-hover': '0 30px 60px -12px rgba(212, 175, 55, 0.25)',
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.4)',
        'glass': '0 8px 32px 0 rgba(11, 37, 25, 0.2)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(3deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.3))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.7))' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
};
