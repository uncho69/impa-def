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
        background: "#DAFFEF",
        foreground: "#C7EEE5",
        accent: "#1668D0",
      },
      fontFamily: {
        overpass: "var(--font-overpass)",
        oxygen: "var(--font-oxygen)",
        roboto: "var(--font-roboto)",
      }
    },
  },
  plugins: [],
};
export default config;
