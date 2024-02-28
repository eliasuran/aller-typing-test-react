/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    // core colors used in app
    colors: {
      bg: '#f2f2f2',
      white: '#ffff',
      red: '#D60001',
      blue: '#0096FF',
      black: '#000000',
    },

    // custom font sizes
    fontSize: {
      xxs: '0.8rem',
      xs: '1rem',
      sm: '1.5rem',
      md: '1.8rem',
      lg: '2.3rem',
      xl: '2.5rem',
      xxl: '3rem',
    },

    // TODO: add custom font?

    // background image
    extend: {
      backgroundImage: {
        'background-image':
          "url('https://static0.gamerantimages.com/wordpress/wp-content/uploads/2021/11/Monogatari-Series-Feature-Image.jpg')",
      },
    },
  },
  plugins: [],
};
