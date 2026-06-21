"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { trackFaqExpand, trackPrimaryCtaClick, trackSecondaryCtaClick } from "@/lib/analytics";
import type {
  BenefitsSection,
  DifferentiatorsSection,
  FaqSection,
  FooterCtaSection,
  HeroSection,
  ProblemSection,
  ProofSection,
  WorkflowSection
} from "@/lib/types";

const heroCarouselImages = [
  {
    src: "/products/nitro-front-hero.webp",
    alt: "Nitro socket system product photography"
  },
  {
    src: "/products/nitro-rear-detail.webp",
    alt: "Nitro socket system detail view"
  }
];

function LinkedText({ text }: { text?: string }) {
  if (!text) {
    return null;
  }

  const linkPattern = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
  const parts: Array<string | { label: string; href: string }> = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push({ label: match[1], href: match[2] });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return (
    <>
      {parts.map((part, index) =>
        typeof part === "string" ? (
          part
        ) : (
          <a key={`${part.href}-${index}`} href={part.href} target="_blank" rel="noreferrer" className="content-link">
            {part.label}
          </a>
        )
      )}
    </>
  );
}

function SectionShell({
  children,
  id,
  compact = false,
  tone = "default"
}: {
  children: React.ReactNode;
  id?: string;
  compact?: boolean;
  tone?: "default" | "muted" | "dark";
}) {
  const shellClass = compact ? "section-shell section-shell--compact" : "section-shell";
  const toneClass =
    tone === "muted" ? "section-panel section-panel--muted" : tone === "dark" ? "section-panel section-panel--dark" : "";

  return (
    <section id={id} className={shellClass}>
      <div className={toneClass}>{children}</div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  heading,
  copy
}: {
  eyebrow?: string;
  heading: string;
  copy?: string;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="section-title">{heading}</h2>
      {copy ? (
        <div className="section-copy-group">
          {copy.split(/\n{2,}/).map((paragraph) => (
            <p key={paragraph} className="section-copy">
              {paragraph}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function CtaLink({
  href,
  label,
  variant = "primary",
  location,
  isExternal = false,
  className = ""
}: {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
  location: "hero" | "footer";
  isExternal?: boolean;
  className?: string;
}) {
  const buttonClassName = variant === "secondary" ? "pill-button-secondary" : "pill-button-primary";

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className={`${buttonClassName} cta-button-fixed min-h-12 justify-center ${className}`}
      onClick={() => {
        if (variant === "secondary") {
          trackSecondaryCtaClick(location);
        } else {
          trackPrimaryCtaClick(location);
        }
      }}
    >
      {label}
    </a>
  );
}

function HeroVisual() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroCarouselImages.length);
    }, 4200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="hero-media">
      <div className="hero-media__main">
        {heroCarouselImages.map((image, index) => (
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 1023px) 100vw, 52vw"
            className={`object-cover object-[50%_44%] transition-opacity duration-1000 ease-in-out ${
              activeIndex === index ? "opacity-100" : "opacity-0"
            }`}
            priority={index === 0}
          />
        ))}
        <div className="hero-media__overlay" />
      </div>
    </div>
  );
}

export function HeroSectionView({ section }: { section: HeroSection }) {
  return (
    <SectionShell id="top">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center xl:gap-14">
        <div className="min-w-0 lg:col-span-6">
          {section.eyebrow ? <p className="eyebrow">{section.eyebrow}</p> : null}
          <h1 className="hero-title mt-4 max-w-[20ch] font-display text-5xl leading-[0.95] text-[#1a1a1a] sm:text-6xl lg:text-[4.25rem]">
            {section.heading}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-mist md:text-lg">{section.subheading}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CtaLink href={section.primaryCta.href} label={section.primaryCta.label} location="hero" />
            <CtaLink href={section.secondaryCta.href} label={section.secondaryCta.label} variant="secondary" location="hero" />
          </div>
        </div>
        <div className="min-w-0 lg:col-span-6">
          <HeroVisual />
        </div>
      </div>
      <div className="hero-proof-strip mt-10 flex flex-wrap justify-center gap-3 lg:mt-12">
        {section.proofBullets.map((item) => (
          <div key={item.id} className="proof-pill">
            {item.label}
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

export function ProblemGridSection({ section }: { section: ProblemSection }) {
  return (
    <SectionShell id="problem" tone="muted">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
        <div className="min-w-0 lg:col-span-7">
          <SectionHeader eyebrow={section.eyebrow} heading={section.heading} copy={section.copy} />
        </div>
        <div className="section-image-card section-image-card--dark aspect-[4/3] min-w-0 overflow-hidden lg:col-span-5">
          <Image
            src="/products/tpu-lattice-cad.webp"
            alt="CAD lattice visualization showing advanced digital O&P fabrication"
            fill
            sizes="(max-width: 1023px) 100vw, 34rem"
            className="object-cover object-center"
          />
        </div>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {section.items.map((item) => (
          <article key={item.id} className="shared-card">
            <h3 className="shared-card-title">{item.title}</h3>
            <p className="shared-card-body">
              <LinkedText text={item.copy} />
            </p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

export function DifferentiatorsSectionView({ section }: { section: DifferentiatorsSection }) {
  return (
    <SectionShell id="differentiators">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
        <div className="min-w-0 lg:col-span-7">
          <SectionHeader eyebrow={section.eyebrow} heading={section.heading} copy={section.copy} />
        </div>
        <div className="section-image-card section-image-card--dark aspect-[4/3] max-h-[28rem] min-w-0 overflow-hidden lg:col-span-5">
          <Image
            src="/products/formlabs-printer-card.jpg"
            alt="Formlabs selective laser sintering printer used for digital O&P manufacturing"
            fill
            sizes="(max-width: 1023px) 100vw, 34rem"
            className="object-cover object-[50%_37%] md:object-contain md:object-center md:p-6"
          />
        </div>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {section.items.map((item) => (
          <article key={item.id} className="shared-card">
            <h3 className="shared-card-title">{item.title}</h3>
            <p className="shared-card-body">
              <LinkedText text={item.copy} />
            </p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

export function BenefitsSectionView({ section }: { section: BenefitsSection }) {
  return (
    <SectionShell id="benefits" tone="muted">
      <SectionHeader eyebrow={section.eyebrow} heading={section.heading} />
      <div className="mt-10 grid gap-5 lg:grid-cols-12 lg:items-stretch">
        <div className="section-image-card section-image-card--light aspect-[4/5] max-h-[34rem] min-w-0 overflow-hidden lg:col-span-4">
          <Image
            src="/products/orthosis-benefits-crop.webp"
            alt="Custom orthosis product on a white background"
            fill
            sizes="(max-width: 1023px) 100vw, 28rem"
            className="object-contain object-center p-4 md:p-6"
          />
        </div>
        <div className="grid min-w-0 gap-5 md:grid-cols-3 lg:col-span-8">
          {section.items.map((item) => (
            <article key={item.id} className="shared-card">
              <h3 className="shared-card-title">{item.title}</h3>
              <p className="shared-card-body">
                <LinkedText text={item.copy} />
              </p>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

export function WorkflowSectionView({ section }: { section: WorkflowSection }) {
  return (
    <SectionShell id="workflow">
      <SectionHeader eyebrow={section.eyebrow} heading={section.heading} copy={section.introLine} />
      <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-4 xl:gap-10">
        {section.steps.map((step) => (
          <article key={step.id} className="process-step">
            <p className="process-step__label">{step.step}</p>
            <h3 className="process-step__title">{step.title}</h3>
            <p className="process-step__body">{step.copy}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

export function ProofSectionView({ section }: { section: ProofSection }) {
  return (
    <SectionShell id="proof" compact tone="muted">
      <SectionHeader eyebrow={section.eyebrow} heading={section.heading} />
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <div className="section-image-card section-image-card--light aspect-[16/10] overflow-hidden">
          <Image
            src="/products/mjf-elbow-capability.webp"
            alt="Raw MJF elbow fabrication component"
            fill
            sizes="(max-width: 1023px) 100vw, 40rem"
            className="object-cover object-center"
          />
        </div>
        <div className="section-image-card section-image-card--light aspect-[16/10] overflow-hidden">
          <Image
            src="/products/flexible-liner-product.webp"
            alt="Flexible liner product photography"
            fill
            sizes="(max-width: 1023px) 100vw, 40rem"
            className="object-cover object-center"
          />
        </div>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {section.items.map((item) => (
          <article key={item.id} className="proof-card">
            <h3 className="shared-card-title">{item.label}</h3>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

export function FaqSectionView({ section }: { section: FaqSection }) {
  return (
    <SectionShell id="faq">
      <SectionHeader eyebrow="Frequently Asked Questions" heading={section.heading} />
      <div className="mt-10 grid gap-4">
        {section.items.map((item, index) => (
          <details
            key={item.id}
            className="faq-item group"
            open={item.openByDefault}
            onToggle={(event) => {
              if ((event.currentTarget as HTMLDetailsElement).open) {
                trackFaqExpand(index + 1);
              }
            }}
          >
            <summary className="faq-item__summary">
              <span>{item.question}</span>
              <span className="faq-item__indicator" aria-hidden="true">
                <span className="faq-item__indicator-line faq-item__indicator-line--horizontal" />
                <span className="faq-item__indicator-line faq-item__indicator-line--vertical group-open:scale-y-0" />
              </span>
            </summary>
            <p className="faq-item__answer">{item.answer}</p>
          </details>
        ))}
      </div>
    </SectionShell>
  );
}

export function FooterCtaSectionView({ section }: { section: FooterCtaSection }) {
  return (
    <SectionShell id="footer-cta" compact tone="dark">
      <div className="max-w-4xl">
        {section.eyebrow ? <p className="eyebrow text-white/70">{section.eyebrow}</p> : null}
        <h2 className="section-title mt-4 text-white">{section.heading}</h2>
        {section.copy ? <p className="section-copy mt-4 max-w-3xl text-white/78">{section.copy}</p> : null}
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <CtaLink href={section.primaryCta.href} label={section.primaryCta.label} location="footer" />
        <CtaLink
          href={section.secondaryCta.href}
          label={section.secondaryCta.label}
          variant="secondary"
          location="footer"
          isExternal={section.secondaryCta.isExternal}
          className="border-white text-white hover:bg-white/10"
        />
      </div>
    </SectionShell>
  );
}
