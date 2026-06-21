import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        canvas: "var(--color-canvas)",
        "canvas-strong": "var(--color-canvas-strong)",
        ink: "var(--color-ink)",
        "ink-soft": "var(--color-ink-soft)",
        mist: "var(--color-mist)",
        line: "var(--color-line)",
        "line-strong": "var(--color-line-strong)",
        accent: "var(--color-accent)",
        "accent-strong": "var(--color-accent-strong)",
        "card-strong": "var(--color-card-strong)"
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "Helvetica", "Arial", "sans-serif"]
      },
      boxShadow: {
        panel: "0 24px 80px rgba(13, 18, 30, 0.12)"
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(circle at top left, rgba(242, 142, 28, 0.22), transparent 30%), radial-gradient(circle at 80% 18%, rgba(248, 107, 81, 0.14), transparent 24%), linear-gradient(180deg, rgba(255, 247, 237, 0.98) 0%, rgba(249, 247, 248, 0.94) 58%, rgba(255, 255, 255, 0.98) 100%)"
      }
    }
  },
  plugins: []
};

export default config;
