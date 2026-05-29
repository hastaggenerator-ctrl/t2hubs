export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui'] },
      colors: {
        ink: '#0f172a',
        brand: '#2563eb',
        mint: '#14b8a6',
        gold: '#f59e0b'
      },
      boxShadow: {
        soft: '0 18px 60px rgba(15, 23, 42, 0.10)'
      }
    }
  },
  plugins: []
};

