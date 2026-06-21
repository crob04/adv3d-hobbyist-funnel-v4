import { mockLandingPage } from "./mock-data.ts";
import type { LandingPage } from "./types.ts";

type PayloadLandingPageSeed = {
  title: string;
  slug: string;
  seo: {
    title: string;
    description: string;
    ogTitle?: string;
    ogDescription?: string;
  };
  hero: {
    eyebrow?: string;
    heading: string;
    subheading: string;
    primaryCta?: {
      label: string;
      href: string;
      isExternal?: boolean;
    };
    secondaryCta?: {
      label: string;
      href: string;
      isExternal?: boolean;
    };
    proofBullets: Array<{ label: string }>;
  };
  problem: {
    eyebrow?: string;
    heading: string;
    copy: string;
    items: Array<{ title: string; copy: string }>;
  };
  differentiators: {
    eyebrow?: string;
    heading: string;
    copy: string;
    items: Array<{ title: string; copy?: string }>;
  };
  benefits: {
    eyebrow?: string;
    heading: string;
    items: Array<{ title: string; copy?: string }>;
  };
  workflow: {
    eyebrow?: string;
    heading: string;
    introLine: string;
    steps: Array<{ step: string; title: string; copy: string }>;
  };
  proof: {
    eyebrow?: string;
    heading: string;
    items: Array<{ label: string }>;
  };
  faq: {
    heading: string;
    items: Array<{ question: string; answer: string; openByDefault: boolean }>;
  };
  contact: {
    eyebrow?: string;
    heading: string;
    copy: string;
    primarySubmitLabel: string;
    secondarySubmitLabel: string;
    successMessage: string;
    errorMessage: string;
  };
  footerCta: {
    eyebrow?: string;
    heading: string;
    copy?: string;
    primaryCta?: {
      label: string;
        href: string;
        isExternal?: boolean;
      };
    secondaryCta?: {
      label: string;
      href: string;
      isExternal?: boolean;
    };
  };
  contactConfig: {
    staffEmailOverride?: string;
    fromNameOverride?: string;
    fromEmailOverride?: string;
    fallbackContactEmail?: string;
  };
};

function normalizeLink(link?: { label?: string; href?: string; isExternal?: boolean }) {
  if (!link?.label || !link?.href) {
    return undefined;
  }

  return {
    label: link.label,
    href: link.href,
    isExternal: link.isExternal ?? false
  };
}

export function toPayloadLandingPageSeed(page: LandingPage = mockLandingPage): PayloadLandingPageSeed {
  return {
    title: page.title,
    slug: page.slug,
    seo: {
      title: page.seo.title,
      description: page.seo.description,
      ogTitle: page.seo.ogTitle,
      ogDescription: page.seo.ogDescription
    },
    hero: {
      eyebrow: page.hero.eyebrow,
      heading: page.hero.heading,
      subheading: page.hero.subheading,
      primaryCta: normalizeLink(page.hero.primaryCta),
      secondaryCta: normalizeLink(page.hero.secondaryCta),
      proofBullets: page.hero.proofBullets.map((item) => ({
        label: item.label
      }))
    },
    problem: {
      eyebrow: page.problem.eyebrow,
      heading: page.problem.heading,
      copy: page.problem.copy,
      items: page.problem.items.map((item) => ({
        title: item.title,
        copy: item.copy || ""
      }))
    },
    differentiators: {
      eyebrow: page.differentiators.eyebrow,
      heading: page.differentiators.heading,
      copy: page.differentiators.copy,
      items: page.differentiators.items.map((item) => ({
        title: item.title,
        copy: item.copy
      }))
    },
    benefits: {
      eyebrow: page.benefits.eyebrow,
      heading: page.benefits.heading,
      items: page.benefits.items.map((item) => ({
        title: item.title,
        copy: item.copy
      }))
    },
    workflow: {
      eyebrow: page.workflow.eyebrow,
      heading: page.workflow.heading,
      introLine: page.workflow.introLine,
      steps: page.workflow.steps.map((step) => ({
        step: step.step,
        title: step.title,
        copy: step.copy
      }))
    },
    proof: {
      eyebrow: page.proof.eyebrow,
      heading: page.proof.heading,
      items: page.proof.items.map((item) => ({
        label: item.label
      }))
    },
    faq: {
      heading: page.faq.heading,
      items: page.faq.items.map((item) => ({
        question: item.question,
        answer: item.answer,
        openByDefault: item.openByDefault ?? false
      }))
    },
    contact: {
      eyebrow: page.contact.eyebrow,
      heading: page.contact.heading,
      copy: page.contact.copy,
      primarySubmitLabel: page.contact.primarySubmitLabel,
      secondarySubmitLabel: page.contact.secondarySubmitLabel,
      successMessage: page.contact.successMessage,
      errorMessage: page.contact.errorMessage
    },
    footerCta: {
      eyebrow: page.footerCta.eyebrow,
      heading: page.footerCta.heading,
      copy: page.footerCta.copy,
      primaryCta: normalizeLink(page.footerCta.primaryCta),
      secondaryCta: normalizeLink(page.footerCta.secondaryCta)
    },
    contactConfig: {
      staffEmailOverride: page.contactConfig.staffEmailOverride,
      fromNameOverride: page.contactConfig.fromNameOverride,
      fromEmailOverride: page.contactConfig.fromEmailOverride,
      fallbackContactEmail: page.contactConfig.fallbackContactEmail
    }
  };
}
