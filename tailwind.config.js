/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        gold: {
          50: '#FDFBF7',
          100: '#FBF7EE',
          200: '#F5EACF',
          300: '#EEDAA5',
          400: '#E5C677',
          500: '#D4AF37', // Metallic Gold
          600: '#B89025',
          700: '#916E18',
          800: '#6E5110',
          900: '#4A3508',
          light: '#F5E0A3',
          dark: '#AA7C11',
          metallic: '#C5A059',
        },
        onyx: {
          950: '#050505',
          900: '#0A0A0C',
          850: '#121214',
          800: '#18181C',
          700: '#26262B',
          600: '#3F3F46',
        }
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(212, 175, 55, 0.3)',
        'gold-glow-lg': '0 0 50px -10px rgba(212, 175, 55, 0.4)',
        'gold-border': '0 0 15px rgba(212, 175, 55, 0.25)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        shimmer: 'shimmer 3s infinite linear',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

