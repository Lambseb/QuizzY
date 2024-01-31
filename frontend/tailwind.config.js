/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#081D44",
        secondary: "#97DBF5",
      },
      backgroundImage: {
        cheh: "url('./src/assets/cheh.jpeg')",
      },
    },
    fontFamily: {
      main: ["Keania One"],
    },
  },
  plugins: ["flowbite/plugin"],
};
