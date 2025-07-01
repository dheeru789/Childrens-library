import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx}",
    "./index.html"
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(240, 4.9%, 83.9%)", // <-- Add this line
      },
    },
  },
  plugins: [],
};
export default config;
