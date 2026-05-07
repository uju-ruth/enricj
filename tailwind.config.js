/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
        sans:  ["'DM Sans'", "sans-serif"],
      },
      colors: {
        ivory:  "#F7F4EF",
        ink:    "#1A1917",
        stone:  "#6B6560",
        ash:    "#C8C3BB",
        sienna: "#8B5E3C",
        mist:   "#EDE9E3",
      },
    },
  },
  plugins: [],
};
