/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          blue: "#2733ea",
          pink: "#ff6174",
        },
      },
      fontFamily: {
        sans: ["Lexend", "Noto Sans SC", "sans-serif"],
      },
    },
  },
  plugins: [],
};
