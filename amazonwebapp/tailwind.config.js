/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Includes all your React component files
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")], // Add Daisy UI plugin here
};
