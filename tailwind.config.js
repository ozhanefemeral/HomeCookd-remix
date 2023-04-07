/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      colors: {
        'primary': {
          '50': '#fff4ed',
          '100': '#ffe6d5',
          '200': '#feccaa',
          '300': '#fdac74',
          '400': '#fb8a3c',
          '500': '#f97316',
          '600': '#ea670c',
          '700': '#c2570c',
          '800': '#9a4a12',
          '900': '#7c3d12',
          '950': '#432007',
          DEFAULT: "#f97316",
        },
        light: "#F5F5F5",
        dark: "#1A1A1A",
      }
    },
  },
  plugins: [],
};
