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
        ivory:  "#0A0A0C",  // page background — near-black
        ink:    "#F4F2ED",  // primary text / inverted fills — warm off-white
        stone:  "#A8A39C",  // secondary text — warm grey
        ash:    "#3A373C",  // muted borders
        sienna: "#D7FF3E",  // accent — neon chartreuse
        mist:   "#1E1D21",  // dividers / subtle panels
        volt:   "#9D5CFF",  // secondary accent — electric violet glow
      },
      boxShadow: {
        glow:  "0 0 40px -8px rgba(215,255,62,0.35)",
        volt:  "0 0 60px -10px rgba(157,92,255,0.45)",
      },
    },
  },
  plugins: [],
};