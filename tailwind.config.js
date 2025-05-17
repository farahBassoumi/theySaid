const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      fontFamily: {
        josefin: ['"Josefin Sans"', 'sans-serif'],
        nunito: ['"Nunito"', 'sans-serif'],
      },
      colors: {
        // main: '#8E7DBE',
        main: {
          light: '#AED6F1', // lighter blue (soft pastel blue)
          DEFAULT: '#5490E6', // default blue (medium saturation)
          dark: '#4B81CF', // darker blue (deep navy-ish)
          text: '#1B2C59', // dark blue for text (strong contrast)
        },
        mainBg: {
          DEFAULT:'#e4e1cb',
        light: '#f7f4e1',
        },
        life: {
          light: '#BFEAEA', // background (lighter)
          DEFAULT: '#A6D6D6', // background (default)
          dark: '#6DAEAE', // background (darker)
          text: '#134E4E', // foreground text for DEFAULT bg
        },
        personal: {
          light: '#FBE3E8',
          DEFAULT: '#F7CFD8',
          dark: '#DAA3AF',
          text: '#7D3048', // suitable contrast for DEFAULT bg
        },
        work: {
          light: '#FAFBE5',
          DEFAULT: '#F4F8D3',
          dark: '#D3D9A8',
          text: '#666933', // suitable contrast for DEFAULT bg
        },
      },
    },
  },
  plugins: [],
};
