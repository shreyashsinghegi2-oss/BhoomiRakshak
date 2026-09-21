/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
        mono: ["Roboto Mono", "monospace"],
      },
      colors: {
        command: "#070B14",
        slate: "#0F172A",
        cyan: "#00F0FF",
        violet: "#7C3AED",
        emerald: "#10B981",
        amber: "#F59E0B",
        crimson: "#EF4444",
      },
    },
  },
  plugins: [],
};