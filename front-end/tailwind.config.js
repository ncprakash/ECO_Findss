/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // enable dark mode via 'dark' class
  theme: {
    extend: {
      colors: {
        "primary": "#17cf17",
        "background-light": "#f6f8f6",
        "background-dark": "#112111",
      },
      fontFamily: {
        "display": ["Manrope", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "lg": "1rem",
        "xl": "1.5rem",
        "full": "9999px"
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }, // move half since we duplicate items
        },
      },
      animation: {
        marquee: 'marquee 20s linear infinite',
      },
    },
  },
  plugins: [],
}
