import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "brand-primary": "var(--brand-primary)",
        "brand-primary-hover": "var(--brand-primary-hover)",
        "brand-accent": "var(--brand-accent)",
        "brand-accent-hover": "var(--brand-accent-hover)",
        "brand-bg": "var(--brand-bg)",
        "brand-surface": "var(--brand-surface)",
        "brand-surface-2": "var(--brand-surface-2)",
        "brand-text": "var(--brand-text)",
        "brand-muted": "var(--brand-muted)",
        "brand-border": "var(--brand-border)",
        "brand-success": "var(--brand-success)",
        "brand-danger": "var(--brand-danger)",
        "brand-warning": "var(--brand-warning)",
        canvas: "var(--color-canvas)",
        "canvas-strong": "var(--color-canvas-strong)",
        "canvas-muted": "var(--color-canvas-muted)",
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
        display: ["var(--font-display)", "Helvetica", "Arial", "sans-serif"],
        body: ["var(--font-body)", "Helvetica", "Arial", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;