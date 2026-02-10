/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        //  Green Healthcare Palette
        primary: "#22C55E",   // mint green
        accent: "#A3E635",    // lime green

        //  Light Mode
        lightbg: "#F0FDF4",   // soft mint background

        //  Dark Mode
        darkbg: "#0F172A",    // slate dark
        darkcard: "#020617", // deep card dark
      },
    },
  },
  plugins: [],
};




