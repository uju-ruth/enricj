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
        ivory:  "#0A0A0C",
        ink:    "#F4F2ED",
        stone:  "#A8A39C",
        ash:    "#3A373C",
        sienna: "#E3B655",  // was #D7FF3E
        mist:   "#1E1D21",
        volt:   "#8F72E0",  // was #9D5CFF
      },
      boxShadow: {
        glow:  "0 0 40px -8px rgba(227,182,85,0.30)",
        volt:  "0 0 60px -10px rgba(143,114,224,0.40)",
      },
      boxShadow: {
        glow:  "0 0 40px -8px rgba(215,255,62,0.35)",
        volt:  "0 0 60px -10px rgba(157,92,255,0.45)",
      },
    },
  },
  plugins: [],
};