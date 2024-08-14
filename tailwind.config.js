/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./container/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        customBlue: "rgba(41,76,136,0.5)",
        "white-03": "rgba(225, 225, 225, 0.18)",
        primary: "#2563EB",
        border: "#DBEAFE",
        skeleton: "#E5E7EB",
        heading: {
          DEFAULT: "#000000",
          light: "#000000",
          dark: "#ffffff",
        },
        subheading: {
          DEFAULT: "#1F2937",
          light: "#1F2937",
          dark: "#ffffff",
        },
        background: {
          DEFAULT: "#ffffff",
          light: "#ffffff",
          dark: "#0f172a",
        },
        backgroundlite: {
          DEFAULT: "#EFF6FF",
          light: "#EFF6FF",
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
      backdropBlur: {
        16: "16px",
        custom: "8px",
      },
      borderColor: {
        "white-015": "rgba(225, 225, 225, 0.18)",
      },
      boxShadow: {
        "3xl":
          "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset",
      },
      fontFamily: {
        DancingScript: ["var(--font-DancingScript)"],
        DMSans: ["var(--font-DMSans)"],
        OpenSans: ["var(--font-OpenSans)"],
      },
      keyframes: {
        "accordion-down": {
          from: {height: "0"},
          to: {height: "var(--radix-accordion-content-height)"},
        },
        "accordion-up": {
          from: {height: "var(--radix-accordion-content-height)"},
          to: {height: "0"},
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
