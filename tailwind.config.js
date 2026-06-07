/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        accent: "var(--accent-color)",
        whitesoft: "var(--white-color)",
        blacksoft: "var(--black-color)",
        lightgray: "var(--light-gray-color)",
        graysoft: "var(--gray-color)",
      },
    },
  },
  plugins: [],
};
