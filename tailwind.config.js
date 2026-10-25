/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Optionnel : tu peux ajouter les couleurs exactes de MyShop ici
        brandYellow: '#f2b705',
        brandBeige: '#f3eee8',
      },
    },
  },
  plugins: [],
}