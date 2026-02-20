import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: {
          50: "#e6f1ff",
          100: "#cce3ff",
          200: "#99c7ff",
          300: "#66abff",
          400: "#338fff",
          500: "#0073e6",
          600: "#005cb8",
          700: "#00448a",
          800: "#002d5c",
          900: "#00162e",
        },
        secondary: {
          50: "#f0f0ff",
          100: "#e0e1ff",
          200: "#c1c3ff",
          300: "#a2a5ff",
          400: "#8387ff",
          500: "#6469ff",
          600: "#5054cc",
          700: "#3c3f99",
          800: "#282a66",
          900: "#141533",
        },
        neutral: {
          50: "#f7f9fa",
          100: "#eef3f5",
          200: "#dde7eb",
          300: "#ccdbe1",
          400: "#bbcfd7",
          500: "#aac3cd",
          600: "#889ca4",
          700: "#66757b",
          800: "#444e52",
          900: "#222729",
        },
        background: "#f8fafc",
      },
      fontFamily: {
        montserrat: "var(--font-montserrat)",
        inter: "var(--font-inter)",
        sourceCode: "var(--font-source-code)",
      },
    },
  },
  plugins: [],
};
export default config;
