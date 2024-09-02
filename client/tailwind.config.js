/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "book-dark": "#0B2027",
        "book-green": "#6b8f71",
        "book-sage": "#B1C0A1",
        "book-light": "#f6f1d1",
        "book-green-hover": "#729A78"
      }
    },
  },
  plugins: [],
}

