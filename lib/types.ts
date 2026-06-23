export type Link = {
  label: string;
  href: string;
  isExternal?: boolean;
};

export type Seo = {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
};

export type HeroSection = {
  heading: string;
  subheading: string;
  primaryCta: Link;
  secondaryCta: Link;
  image: {
    src: string;
    alt: string;
  };
};

export type ProblemSection = {
  heading: string;
  copy: string;
};

export type WhyUsRow = {
  title: string;
  copy: string;
  bullets: string[];
};

export type WhyUsSection = {
  heading: string;
  subheading: string;
  rows: WhyUsRow[];
  image: {
    src: string;
    alt: string;
  };
  primaryCta: Link;
};

export type WhatYouGetCard = {
  title: string;
  copy: string;
  image: {
    src: string;
    alt: string;
  };
};

export type WhatYouGetSection = {
  heading: string;
  subheading: string;
  leadCard: WhatYouGetCard;
  secondaryCards: WhatYouGetCard[];
  primaryCta: Link;
};

export type HowItWorksStep = {
  step: string;
  title: string;
  copy: string;
};

export type HowItWorksSection = {
  heading: string;
  steps: HowItWorksStep[];
  primaryCta: Link;
};

export type ProofSection = {
  heading: string;
  subheading: string;
  body: string;
  caption: string;
  image: {
    src: string;
    alt: string;
  };
  primaryCta: Link;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqSection = {
  heading: string;
  subheading: string;
  items: FaqItem[];
  closingLine: string;
  primaryCta: Link;
};

export type FinalCtaSection = {
  heading: string;
  subheading: string;
  primaryCta: Link;
  secondaryCta: Link;
};

export type SiteNavItem = {
  label: string;
  href: string;
};

export type LandingPage = {
  seo: Seo;
  navItems: SiteNavItem[];
  hero: HeroSection;
  problem: ProblemSection;
  whyUs: WhyUsSection;
  whatYouGet: WhatYouGetSection;
  howItWorks: HowItWorksSection;
  proof: ProofSection;
  faq: FaqSection;
  finalCta: FinalCtaSection;
  businessName: string;
  phoneDisplay: string;
  phoneHref: string;
};