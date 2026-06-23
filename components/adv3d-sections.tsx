import type { LandingPage } from "@/lib/types";
import { Button, Eyebrow, FaqEntry, ThemeToggle } from "./ui";

function SectionShell({
  id,
  className = "",
  children
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`mx-auto w-full max-w-7xl px-6 md:px-10 ${className}`}
    >
      {children}
    </section>
  );
}

function SiteHeader({ page }: { page: LandingPage }) {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-border bg-brand-bg/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-4 md:px-10">
        <a
          href="#top"
          className="font-display text-lg font-semibold tracking-tight text-brand-text"
        >
          {page.businessName}
        </a>
        <nav aria-label="Primary" className="hidden gap-6 md:flex">
          {page.navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-brand-text transition hover:text-brand-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button label={page.hero.primaryCta.label} href={page.hero.primaryCta.href} />
        </div>
      </div>
    </header>
  );
}

function SiteFooter({ page }: { page: LandingPage }) {
  return (
    <footer className="border-t border-brand-border bg-brand-surface-2">
      <SectionShell className="py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr] md:items-end">
          <div>
            <h2 className="font-display text-3xl font-semibold leading-tight text-brand-text md:text-4xl">
              {page.finalCta.heading}
            </h2>
            <p className="mt-3 max-w-xl text-base leading-7 text-brand-muted">
              {page.finalCta.subheading}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button label={page.finalCta.primaryCta.label} href={page.finalCta.primaryCta.href} />
              <Button
                label={page.finalCta.secondaryCta.label}
                href={page.finalCta.secondaryCta.href}
                variant="secondary"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 text-sm text-brand-text md:items-end">
            <a
              href={page.phoneHref}
              className="font-semibold underline underline-offset-4 transition hover:text-brand-primary"
            >
              Call {page.phoneDisplay}
            </a>
            <span className="text-brand-muted">
              One piece is fine. Twenty is fine. We print in FDM, resin, SLS, and TPU.
            </span>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-brand-border pt-6 text-xs text-brand-muted md:flex-row md:items-center md:justify-between">
          <span>(c) {new Date().getFullYear()} {page.businessName}. Built in Kinston, NC.</span>
          <span>FDM, resin, TPU, SLS, and the materials between.</span>
        </div>
      </SectionShell>
    </footer>
  );
}

function HeroSection({ page }: { page: LandingPage }) {
  return (
    <section
      id="top"
      className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-20 md:grid-cols-12 md:gap-12 md:px-10 md:py-28"
    >
      <div className="md:col-span-5">
        <h1 className="font-display text-4xl font-semibold leading-[1.05] text-brand-text md:text-[3.4rem] md:leading-[1.04]">
          {page.hero.heading}
        </h1>
        <p className="mt-6 max-w-xl text-base leading-7 text-brand-muted md:text-lg">
          {page.hero.subheading}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button label={page.hero.primaryCta.label} href={page.hero.primaryCta.href} />
          <Button
            label={page.hero.secondaryCta.label}
            href={page.hero.secondaryCta.href}
            variant="secondary"
          />
        </div>
      </div>
      <div className="md:col-span-7">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-brand-border bg-brand-surface shadow-[0_24px_50px_rgba(0,0,0,0.12)]">
          <img
            src={page.hero.image.src}
            alt={page.hero.image.alt}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function ProblemSection({ page }: { page: LandingPage }) {
  return (
    <SectionShell id="problem" className="py-20 md:py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-3xl font-semibold leading-tight text-brand-text md:text-4xl">
          {page.problem.heading}
        </h2>
        <p className="mt-6 text-base leading-8 text-brand-muted md:text-lg">
          {page.problem.copy}
        </p>
      </div>
    </SectionShell>
  );
}

function WhyUsSection({ page }: { page: LandingPage }) {
  return (
    <SectionShell id="why-us" className="py-20 md:py-24">
      <div className="mx-auto max-w-3xl">
        <Eyebrow>WHY US</Eyebrow>
        <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-brand-text md:text-4xl">
          {page.whyUs.heading}
        </h2>
        <p className="mt-3 text-base leading-7 text-brand-muted md:text-lg">
          {page.whyUs.subheading}
        </p>
      </div>

      <div className="mt-12 flex flex-col gap-12 md:gap-16">
        {page.whyUs.rows.map((row, index) => {
          const imageOnLeft = index % 2 === 0;
          return (
            <div
              key={row.title}
              className="grid items-center gap-8 md:grid-cols-2 md:gap-12"
            >
              {imageOnLeft ? (
                <>
                  <div className="order-2 md:order-1">
                    <div className="aspect-[4/3] overflow-hidden rounded-3xl border border-brand-border bg-brand-surface shadow-[0_14px_34px_rgba(0,0,0,0.08)]">
                      <img
                        src={page.whyUs.image.src}
                        alt={page.whyUs.image.alt}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="order-1 md:order-2">
                    <h3 className="font-display text-2xl font-semibold leading-tight text-brand-text md:text-3xl">
                      {row.title}
                    </h3>
                    <p className="mt-4 text-base leading-7 text-brand-muted md:text-lg">
                      {row.copy}
                    </p>
                    <ul className="mt-5 space-y-2 text-base leading-7 text-brand-text">
                      {row.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3">
                          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-primary" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h3 className="font-display text-2xl font-semibold leading-tight text-brand-text md:text-3xl">
                      {row.title}
                    </h3>
                    <p className="mt-4 text-base leading-7 text-brand-muted md:text-lg">
                      {row.copy}
                    </p>
                    <ul className="mt-5 space-y-2 text-base leading-7 text-brand-text">
                      {row.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3">
                          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-primary" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="aspect-[4/3] overflow-hidden rounded-3xl border border-brand-border bg-brand-surface shadow-[0_14px_34px_rgba(0,0,0,0.08)]">
                      <img
                        src={page.whyUs.image.src}
                        alt={page.whyUs.image.alt}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-12 flex flex-wrap justify-center gap-3">
        <Button label={page.whyUs.primaryCta.label} href={page.whyUs.primaryCta.href} />
      </div>
    </SectionShell>
  );
}

function WhatYouGetSection({ page }: { page: LandingPage }) {
  return (
    <SectionShell id="what-you-get" className="py-20 md:py-24">
      <div className="mx-auto max-w-3xl">
        <Eyebrow>WHAT YOU GET</Eyebrow>
        <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-brand-text md:text-4xl">
          {page.whatYouGet.heading}
        </h2>
        <p className="mt-3 text-base leading-7 text-brand-muted md:text-lg">
          {page.whatYouGet.subheading}
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <article className="overflow-hidden rounded-3xl border border-brand-border bg-brand-surface shadow-[0_4px_18px_rgba(0,0,0,0.04)] md:col-span-2">
          <div className="aspect-[16/10] overflow-hidden bg-brand-surface-2">
            <img
              src={page.whatYouGet.leadCard.image.src}
              alt={page.whatYouGet.leadCard.image.alt}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-6 md:p-8">
            <h3 className="font-display text-2xl font-semibold leading-tight text-brand-text md:text-3xl">
              {page.whatYouGet.leadCard.title}
            </h3>
            <p className="mt-3 max-w-2xl text-base leading-7 text-brand-muted md:text-lg">
              {page.whatYouGet.leadCard.copy}
            </p>
          </div>
        </article>

        {page.whatYouGet.secondaryCards.map((card) => (
          <article
            key={card.title}
            className="overflow-hidden rounded-3xl border border-brand-border bg-brand-surface shadow-[0_4px_18px_rgba(0,0,0,0.04)] md:col-span-1"
          >
            <div className="aspect-[4/3] overflow-hidden bg-brand-surface-2">
              <img
                src={card.image.src}
                alt={card.image.alt}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="font-display text-xl font-semibold leading-tight text-brand-text md:text-2xl">
                {card.title}
              </h3>
              <p className="mt-3 text-base leading-7 text-brand-muted">
                {card.copy}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap justify-center gap-3">
        <Button
          label={page.whatYouGet.primaryCta.label}
          href={page.whatYouGet.primaryCta.href}
        />
      </div>
    </SectionShell>
  );
}

function HowItWorksSection({ page }: { page: LandingPage }) {
  return (
    <SectionShell id="how-it-works" className="py-16 md:py-20">
      <div className="mx-auto max-w-3xl">
        <Eyebrow>HOW IT WORKS</Eyebrow>
        <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-brand-text md:text-4xl">
          {page.howItWorks.heading}
        </h2>
      </div>

      <ol className="mt-10 grid gap-8 md:grid-cols-2 md:gap-10 xl:grid-cols-4">
        {page.howItWorks.steps.map((step) => (
          <li key={step.step} className="rounded-2xl border border-brand-border bg-brand-surface p-6">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-brand-primary bg-brand-primary/10 font-display text-base font-semibold text-brand-primary">
              {step.step}
            </span>
            <h3 className="mt-4 font-display text-xl font-semibold leading-tight text-brand-text">
              {step.title}
            </h3>
            <p className="mt-2 text-base leading-7 text-brand-muted">
              {step.copy}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-12 flex flex-wrap justify-center gap-3">
        <Button
          label={page.howItWorks.primaryCta.label}
          href={page.howItWorks.primaryCta.href}
        />
      </div>
    </SectionShell>
  );
}

function ProofSection({ page }: { page: LandingPage }) {
  return (
    <SectionShell id="proof" className="py-20 md:py-24">
      <div className="grid gap-10 md:grid-cols-[3fr_2fr] md:items-center md:gap-12">
        <div>
          <Eyebrow>PROOF</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-brand-text md:text-4xl">
            {page.proof.heading}
          </h2>
          <p className="mt-3 text-base leading-7 text-brand-muted md:text-lg">
            {page.proof.subheading}
          </p>
          <div className="mt-6 space-y-5 text-base leading-8 text-brand-muted md:text-lg">
            <p>{page.proof.body}</p>
          </div>
          <div className="mt-8">
            <Button label={page.proof.primaryCta.label} href={page.proof.primaryCta.href} />
          </div>
        </div>
        <figure className="overflow-hidden rounded-3xl border border-brand-border bg-brand-surface shadow-[0_14px_34px_rgba(0,0,0,0.08)]">
          <div className="aspect-square overflow-hidden bg-brand-surface-2">
            <img
              src={page.proof.image.src}
              alt={page.proof.image.alt}
              className="h-full w-full object-cover"
            />
          </div>
          <figcaption className="border-t border-brand-border bg-brand-surface px-6 py-4 text-sm leading-6 text-brand-muted">
            {page.proof.caption}
          </figcaption>
        </figure>
      </div>
    </SectionShell>
  );
}

function FaqSection({ page }: { page: LandingPage }) {
  return (
    <SectionShell id="faq" className="py-16 md:py-20">
      <div className="mx-auto max-w-3xl">
        <Eyebrow>FAQ</Eyebrow>
        <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-brand-text md:text-4xl">
          {page.faq.heading}
        </h2>
        <p className="mt-3 text-base leading-7 text-brand-muted md:text-lg">
          {page.faq.subheading}
        </p>
      </div>

      <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-4">
        {page.faq.items.map((item) => (
          <FaqEntry key={item.question} question={item.question} answer={item.answer} />
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-3xl text-center">
        <p className="text-base leading-7 text-brand-muted">{page.faq.closingLine}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button label={page.faq.primaryCta.label} href={page.faq.primaryCta.href} />
        </div>
      </div>
    </SectionShell>
  );
}

function FinalCtaSection({ page }: { page: LandingPage }) {
  return (
    <SectionShell id="final-cta" className="py-24 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-4xl font-semibold leading-[1.05] text-brand-text md:text-5xl">
          {page.finalCta.heading}
        </h2>
        <p className="mt-5 text-base leading-7 text-brand-muted md:text-lg">
          {page.finalCta.subheading}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button label={page.finalCta.primaryCta.label} href={page.finalCta.primaryCta.href} />
          <Button
            label={page.finalCta.secondaryCta.label}
            href={page.finalCta.secondaryCta.href}
            variant="secondary"
          />
        </div>
      </div>
    </SectionShell>
  );
}

export function PageRenderer({ page }: { page: LandingPage }) {
  return (
    <div id="top" className="bg-brand-bg text-brand-text">
      <SiteHeader page={page} />
      <main>
        <HeroSection page={page} />
        <ProblemSection page={page} />
        <WhyUsSection page={page} />
        <WhatYouGetSection page={page} />
        <HowItWorksSection page={page} />
        <ProofSection page={page} />
        <FaqSection page={page} />
        <FinalCtaSection page={page} />
      </main>
      <SiteFooter page={page} />
    </div>
  );
}