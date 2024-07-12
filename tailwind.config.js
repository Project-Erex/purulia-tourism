/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./container/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#ef4444",
        border: "#CCCCCC",
        skeleton: "#E5E7EB",
        heading: {
          DEFAULT: "#161c2d",
          light: "#161c2d",
          dark: "#ffffff",
        },
        subheading: {
          DEFAULT: "#475877",
          light: "#475877",
          dark: "#94a3b8",
        },
        background: {
          DEFAULT: "#ffffff",
          light: "#ffffff",
          dark: "#0f172a",
        },
      },
      screens: {
        xsm: "375px",
        xxsm: "425px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      boxShadow: {
        "3xl":
          "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset",
      },
      fontFamily: {
        DancingScript: ["var(--font-DancingScript)"],
        DMSans: ["var(--font-DMSans)"],
      },
    },
  },
  plugins: [],
};
