module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#193042",
        secondary: "#5ab6cc",
        pinky: "#F7ACCF",
      },
    },
  },
  plugins: [require("daisyui")],
};
