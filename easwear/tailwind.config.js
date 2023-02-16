/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        color1: "#008080",
        color4: "hsl(233,12%,13%)",
        color5: "hsl(227,12%,61%)",
        color2: "fffff5",
        color3: "#e5f7e4",
      },
    },
  },
  plugins: [],
};
