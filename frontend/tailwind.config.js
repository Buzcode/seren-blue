/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary':"#a6d4f7"
      },
      gridTemplateColumns:{
        'auto':'repea(auto-fill, minmax(200px,1fr))'
      }
    },
  },
  plugins: [],
}