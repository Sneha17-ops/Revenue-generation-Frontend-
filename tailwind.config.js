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
          green: '#0B3D2E',
          greenDark: '#06241B',
          greenLight: '#154D3B',
          gold: '#D4AF37',
          goldHover: '#E5C158',
          goldMuted: '#F3E5AB',
          goldDark: '#997D20',
          ivory: '#FAF7F2',
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
        'emerald-gradient': 'linear-gradient(135deg, #154D3B 0%, #0B3D2E 60%, #06241B 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
        'dark-glass': 'linear-gradient(135deg, rgba(11,61,46,0.92) 0%, rgba(6,36,27,0.95) 100%)',
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(11, 61, 46, 0.12)',
        'luxury-hover': '0 30px 60px -12px rgba(212, 175, 55, 0.35)',
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.45)',
        'glass': '0 8px 32px 0 rgba(11, 61, 46, 0.15)',
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
          '50%': { transform: 'translateY(-10px) rotate(2deg)' },
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
