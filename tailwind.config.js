
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /bg-(emerald|blue|amber|rose|indigo|purple)-(50|100|500|600|700|800|900)/,
    },
    {
      pattern: /text-(emerald|blue|amber|rose|indigo|purple)-(50|100|400|500|600|700|800|900)/,
    },
    {
      pattern: /border-(emerald|blue|amber|rose|indigo|purple)-(100|200|300|400|500|600)/,
    },
    {
      pattern: /shadow-(emerald|blue|amber|rose|indigo|purple)-500\/20/,
    }
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
