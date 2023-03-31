/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#F97316",
        "primary-dark": "#1F0078",
        light: "#F5F5F5",
        dark: "#1A1A1A",
      }
    },
  },
  plugins: [],
};
