import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#D4A373",
        secondary: "#FAF3E0",
        cta: "#E76F51",
        "text-main": "#1A1A1A",
        "text-sub": "#666666",
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      spacing: {
        xs: "8px",
        sm: "16px",
        md: "24px",
        lg: "40px",
        xl: "64px",
        xxl: "96px",
      },
    },
  },
  plugins: [],
};

export default config;
