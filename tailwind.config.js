/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,tsx,jsx,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#003366",
        "primary-light": "#E8F1FF",
        "secondary": "#ffcc99",
        "secondary-light": "#eee7d8",
      }
    },
  },
  plugins: [],
}

