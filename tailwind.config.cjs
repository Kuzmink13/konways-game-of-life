/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    styled: true,
    themes: [
      {
        mytheme: {
          primary: "#60a5fa",
          secondary: "#1e293b",
          accent: "#fde047",
          neutral: "#1e293b",
          "base-100": "#334155",
          info: "#38bdf8",
          success: "#22c55e",
          warning: "#fde047",
          error: "#f87171",
        },
      },
    ],
    base: false,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
};
