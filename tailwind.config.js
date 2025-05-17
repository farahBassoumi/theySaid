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
        main: {
          light: '#AED6F1',
          DEFAULT: '#5490E6',
          dark: '#3c76cb',
          text: '#1B2C59',
        },
        mainBg: {
          DEFAULT:'#e4e1cb',
          light: '#f7f4e1',
        },
        life: {
          light: '#BFEAEA',
          DEFAULT: '#A6D6D6',
          dark: '#6DAEAE',
          text: '#134E4E',
        },
        personal: {
          light: '#FBE3E8',
          DEFAULT: '#F7CFD8',
          dark: '#DAA3AF',
          text: '#7D3048',
        },
        work: {
          light: '#FAFBE5',
          DEFAULT: '#F4F8D3',
          dark: '#D3D9A8',
          text: '#666933',
        },
      },
    },
  },
  plugins: [],
};
