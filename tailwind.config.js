/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-csgo":
          "linear-gradient(90deg, #5D79AE 45.84%, rgba(204, 186, 124, 0.8) 85.57%, #DE9B35 95.28%)",
      },
      colors: {
        dark: "#030711",
        "dark-secondary": "#0f172a",
        light: "#e2e8f0",
        "light-muted": "#7f8e92",
        "accent-dark": "#38bdf8",
        "border-dark": "#1d283a",
      },
    },
  },
  plugins: [],
};
