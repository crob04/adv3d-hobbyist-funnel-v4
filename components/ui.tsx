"use client";

import { useState, type ReactNode } from "react";

type CtaVariant = "primary" | "secondary" | "ghost";

type ButtonProps = {
  label: string;
  href: string;
  variant?: CtaVariant;
  onClick?: () => void;
};

export function Button({ label, href, variant = "primary", onClick }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold transition duration-200";
  const styles: Record<CtaVariant, string> = {
    primary:
      "bg-brand-primary text-white border border-transparent hover:bg-brand-primary-hover",
    secondary:
      "border-2 border-brand-text bg-transparent text-brand-text hover:bg-brand-surface-2",
    ghost: "text-brand-text underline underline-offset-4 hover:text-brand-primary"
  };

  return (
    <a href={href} className={`${base} ${styles[variant]}`} onClick={onClick}>
      {label}
    </a>
  );
}

type ThemeToggleProps = {
  initialTheme?: "light" | "dark";
};

export function ThemeToggle({ initialTheme = "light" }: ThemeToggleProps) {
  const [theme, setTheme] = useState<"light" | "dark">(initialTheme);

  function toggle() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", next === "dark");
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-border bg-brand-surface text-brand-text transition hover:border-brand-primary"
    >
      <span aria-hidden="true" className="text-base">
        {theme === "light" ? "D" : "L"}
      </span>
    </button>
  );
}

type FaqEntryProps = {
  question: string;
  answer: string;
};

export function FaqEntry({ question, answer }: FaqEntryProps) {
  const [open, setOpen] = useState(false);

  return (
    <details
      className="rounded-2xl border border-brand-border bg-brand-surface px-5 py-5 shadow-[0_4px_18px_rgba(0,0,0,0.04)]"
      open={open}
      onToggle={(event) => setOpen((event.target as HTMLDetailsElement).open)}
    >
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-brand-text">
        <span>{question}</span>
        <span
          aria-hidden="true"
          className="relative inline-flex h-4 w-4 flex-shrink-0 items-center justify-center"
        >
          <span className="absolute h-0.5 w-full rounded-full bg-brand-text" />
          <span
            className={`absolute h-0.5 w-full rounded-full bg-brand-text transition-transform duration-200 ${
              open ? "rotate-0" : "rotate-90"
            }`}
          />
        </span>
      </summary>
      <div className="max-w-4xl pt-4 text-base leading-8 text-brand-muted">
        {answer}
      </div>
    </details>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-muted">
      {children}
    </span>
  );
}