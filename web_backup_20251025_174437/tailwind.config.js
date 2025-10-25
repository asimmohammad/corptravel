/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0ea5e9",
        accent: "#22c55e",
        warning: "#f59e0b",
        danger: "#ef4444",
        muted: "#6b7280"
      },
      borderRadius: { xl2: "1rem" }
    }
  },
  plugins: []
}
