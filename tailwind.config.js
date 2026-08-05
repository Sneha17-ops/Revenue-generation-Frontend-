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
          greenLight: '#135440',
          cream: '#FAF7F2',
          creamDark: '#F5EFE6',
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
        'gold-shine': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)',
        'emerald-gradient': 'linear-gradient(135deg, #135440 0%, #0B3D2E 60%, #06241B 100%)',
        'cream-gradient': 'linear-gradient(180deg, #FAF7F2 0%, #F5EFE6 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 100%)',
        'dark-glass': 'linear-gradient(135deg, rgba(11,61,46,0.92) 0%, rgba(6,36,27,0.96) 100%)',
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(11, 61, 46, 0.1)',
        'luxury-hover': '0 30px 60px -12px rgba(212, 175, 55, 0.3)',
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.45)',
        'gold-glow-lg': '0 0 35px rgba(212, 175, 55, 0.65)',
        'glass': '0 8px 32px 0 rgba(11, 61, 46, 0.08)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'spin-slow': 'spin 25s linear infinite',
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
