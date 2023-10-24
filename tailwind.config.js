/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: [],
  theme: {
    extend: {},
  },
  backgroundImage: {
    'my-bg': "url('/a.jpg')"  // Path to your image in the public folder
  },
  plugins: [],
}

