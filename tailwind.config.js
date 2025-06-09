/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/main/App.tsx', '.src/presentation/**/*.{js,jsx,ts,tsx}'],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}

