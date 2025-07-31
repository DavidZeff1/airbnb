// tailwind.config.js
const { heroui } = require("@heroui/theme");
const daisyui = require("daisyui");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}", // Your actual app files (adjust path if needed)
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["light", "dark", "cupcake"], // or your custom theme
  },
  darkMode: "class",
  plugins: [heroui(), daisyui],
};
