"use client";

import { useEffect, useState } from "react";

import { trackPrimaryCtaClick } from "@/lib/analytics";

export type StickyMobileCtaProps = {
  formSelector?: string;
  ctaHref: string;
  label: string;
  className?: string;
};

export function StickyMobileCta({
  formSelector = "#contact-form",
  ctaHref,
  label,
  className
}: StickyMobileCtaProps) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const formElement = document.querySelector(formSelector);

    if (!formElement) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHidden(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(formElement);

    return () => observer.disconnect();
  }, [formSelector]);

  if (hidden) {
    return null;
  }

  return (
    <div className={`fixed inset-x-0 bottom-0 z-50 border-t border-white/60 bg-white/95 px-4 py-3 backdrop-blur md:hidden ${className ?? ""}`}>
      <a
        href={ctaHref}
        className="pill-button-primary flex min-h-11 w-full items-center justify-center"
        onClick={() => {
          trackPrimaryCtaClick("sticky_mobile");
        }}
      >
        {label}
      </a>
    </div>
  );
}
