import { cache } from "react";

import { mockLandingPage } from "./mock-data";
import type { ContactConfig, LandingPage, Link } from "./types";

type PayloadLink = {
  label?: string | null;
  href?: string | null;
  isExternal?: boolean | null;
};

type PayloadLandingPage = {
  id?: number | string | null;
  title?: string | null;
  slug?: string | null;
  seo?: {
    title?: string | null;
    description?: string | null;
    ogTitle?: string | null;
    ogDescription?: string | null;
  } | null;
  hero?: {
    eyebrow?: string | null;
    heading?: string | null;
    subheading?: string | null;
    primaryCta?: PayloadLink | null;
    secondaryCta?: PayloadLink | null;
    proofBullets?: Array<{ label?: string | null }> | null;
  } | null;
  problem?: {
    eyebrow?: string | null;
    heading?: string | null;
    copy?: string | null;
    items?: Array<{ title?: string | null; copy?: string | null }> | null;
  } | null;
  differentiators?: {
    eyebrow?: string | null;
    heading?: string | null;
    copy?: string | null;
    items?: Array<{ title?: string | null; copy?: string | null }> | null;
  } | null;
  benefits?: {
    eyebrow?: string | null;
    heading?: string | null;
    items?: Array<{ title?: string | null; copy?: string | null }> | null;
  } | null;
  workflow?: {
    eyebrow?: string | null;
    heading?: string | null;
    introLine?: string | null;
    steps?: Array<{ step?: string | null; title?: string | null; copy?: string | null }> | null;
  } | null;
  proof?: {
    eyebrow?: string | null;
    heading?: string | null;
    items?: Array<{ label?: string | null }> | null;
  } | null;
  faq?: {
    heading?: string | null;
    items?: Array<{ question?: string | null; answer?: string | null; openByDefault?: boolean | null }> | null;
  } | null;
  contact?: {
    eyebrow?: string | null;
    heading?: string | null;
    copy?: string | null;
    primarySubmitLabel?: string | null;
    secondarySubmitLabel?: string | null;
    successMessage?: string | null;
    errorMessage?: string | null;
  } | null;
  footerCta?: {
    eyebrow?: string | null;
    heading?: string | null;
    copy?: string | null;
    primaryCta?: PayloadLink | null;
    secondaryCta?: PayloadLink | null;
  } | null;
  contactConfig?: {
    staffEmailOverride?: string | null;
    fromNameOverride?: string | null;
    fromEmailOverride?: string | null;
    fallbackContactEmail?: string | null;
  } | null;
};

type FetchOptions = {
  preview?: boolean;
};

const useMockData = process.env.USE_MOCK_DATA === "true";

export const getPayloadClient = cache(async () => {
  const [{ default: config }, { getPayload }] = await Promise.all([import("@payload-config"), import("payload")]);

  return getPayload({ config });
});

function numericId(value: unknown, fallback: number) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number.parseInt(value, 10);

    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return fallback;
}

function text(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function optionalText(value: unknown) {
  return typeof value === "string" && value.trim() ? value : undefined;
}

function link(value: unknown, fallback: Link): Link {
  if (!value || typeof value !== "object") {
    return fallback;
  }

  const candidate = value as PayloadLink;

  return {
    label: text(candidate.label, fallback.label),
    href: text(candidate.href, fallback.href),
    isExternal: candidate.isExternal ?? fallback.isExternal ?? false
  };
}

function normalizeContactConfig(value: PayloadLandingPage["contactConfig"]): ContactConfig {
  return {
    staffEmailOverride: optionalText(value?.staffEmailOverride),
    fromNameOverride: optionalText(value?.fromNameOverride),
    fromEmailOverride: optionalText(value?.fromEmailOverride),
    fallbackContactEmail: optionalText(value?.fallbackContactEmail) || mockLandingPage.contactConfig.fallbackContactEmail
  };
}

export async function getLandingPageRaw(options: FetchOptions = {}): Promise<PayloadLandingPage | null> {
  const payload = await getPayloadClient();

  return (await payload.findGlobal({
    slug: "landing-page",
    depth: 2,
    draft: options.preview,
    overrideAccess: true
  })) as PayloadLandingPage | null;
}

function normalizeLandingPage(entry: PayloadLandingPage): LandingPage {
  return {
    id: numericId(entry.id, mockLandingPage.id),
    title: text(entry.title, mockLandingPage.title),
    slug: text(entry.slug, mockLandingPage.slug),
    seo: {
      title: text(entry.seo?.title, mockLandingPage.seo.title),
      description: text(entry.seo?.description, mockLandingPage.seo.description),
      ogTitle: text(entry.seo?.ogTitle, mockLandingPage.seo.ogTitle || mockLandingPage.seo.title),
      ogDescription: text(entry.seo?.ogDescription, mockLandingPage.seo.ogDescription || mockLandingPage.seo.description)
    },
    hero: {
      eyebrow: text(entry.hero?.eyebrow, mockLandingPage.hero.eyebrow),
      heading: text(entry.hero?.heading, mockLandingPage.hero.heading),
      subheading: text(entry.hero?.subheading, mockLandingPage.hero.subheading),
      primaryCta: link(entry.hero?.primaryCta, mockLandingPage.hero.primaryCta),
      secondaryCta: link(entry.hero?.secondaryCta, mockLandingPage.hero.secondaryCta),
      proofBullets: (entry.hero?.proofBullets || mockLandingPage.hero.proofBullets).map((item, index) => ({
        id: index + 1,
        label: text(item?.label, mockLandingPage.hero.proofBullets[index]?.label || "")
      }))
    },
    problem: {
      eyebrow: text(entry.problem?.eyebrow, mockLandingPage.problem.eyebrow),
      heading: text(entry.problem?.heading, mockLandingPage.problem.heading),
      copy: text(entry.problem?.copy, mockLandingPage.problem.copy),
      items: (entry.problem?.items || mockLandingPage.problem.items).map((item, index) => ({
        id: index + 1,
        title: text(item?.title, mockLandingPage.problem.items[index]?.title || ""),
        copy: text(item?.copy, mockLandingPage.problem.items[index]?.copy || "")
      }))
    },
    differentiators: {
      eyebrow: text(entry.differentiators?.eyebrow, mockLandingPage.differentiators.eyebrow),
      heading: text(entry.differentiators?.heading, mockLandingPage.differentiators.heading),
      copy: text(entry.differentiators?.copy, mockLandingPage.differentiators.copy),
      items: (entry.differentiators?.items || mockLandingPage.differentiators.items).map((item, index) => ({
        id: index + 1,
        title: text(item?.title, mockLandingPage.differentiators.items[index]?.title || ""),
        copy: text(item?.copy, mockLandingPage.differentiators.items[index]?.copy || "")
      }))
    },
    benefits: {
      eyebrow: text(entry.benefits?.eyebrow, mockLandingPage.benefits.eyebrow),
      heading: text(entry.benefits?.heading, mockLandingPage.benefits.heading),
      items: (entry.benefits?.items || mockLandingPage.benefits.items).map((item, index) => ({
        id: index + 1,
        title: text(item?.title, mockLandingPage.benefits.items[index]?.title || ""),
        copy: text(item?.copy, mockLandingPage.benefits.items[index]?.copy || "")
      }))
    },
    workflow: {
      eyebrow: text(entry.workflow?.eyebrow, mockLandingPage.workflow.eyebrow),
      heading: text(entry.workflow?.heading, mockLandingPage.workflow.heading),
      introLine: text(entry.workflow?.introLine, mockLandingPage.workflow.introLine),
      steps: (entry.workflow?.steps || mockLandingPage.workflow.steps).map((step, index) => ({
        id: index + 1,
        step: text(step?.step, mockLandingPage.workflow.steps[index]?.step || ""),
        title: text(step?.title, mockLandingPage.workflow.steps[index]?.title || ""),
        copy: text(step?.copy, mockLandingPage.workflow.steps[index]?.copy || "")
      }))
    },
    proof: {
      eyebrow: text(entry.proof?.eyebrow, mockLandingPage.proof.eyebrow),
      heading: text(entry.proof?.heading, mockLandingPage.proof.heading),
      items: (entry.proof?.items || mockLandingPage.proof.items).map((item, index) => ({
        id: index + 1,
        label: text(item?.label, mockLandingPage.proof.items[index]?.label || "")
      }))
    },
    faq: {
      heading: text(entry.faq?.heading, mockLandingPage.faq.heading),
      items: (entry.faq?.items || mockLandingPage.faq.items).map((item, index) => ({
        id: index + 1,
        question: text(item?.question, mockLandingPage.faq.items[index]?.question || ""),
        answer: text(item?.answer, mockLandingPage.faq.items[index]?.answer || ""),
        openByDefault: item?.openByDefault ?? mockLandingPage.faq.items[index]?.openByDefault ?? false
      }))
    },
    contact: {
      eyebrow: text(entry.contact?.eyebrow, mockLandingPage.contact.eyebrow),
      heading: text(entry.contact?.heading, mockLandingPage.contact.heading),
      copy: text(entry.contact?.copy, mockLandingPage.contact.copy),
      primarySubmitLabel: text(entry.contact?.primarySubmitLabel, mockLandingPage.contact.primarySubmitLabel),
      secondarySubmitLabel: text(entry.contact?.secondarySubmitLabel, mockLandingPage.contact.secondarySubmitLabel),
      successMessage: text(entry.contact?.successMessage, mockLandingPage.contact.successMessage),
      errorMessage: text(entry.contact?.errorMessage, mockLandingPage.contact.errorMessage)
    },
    footerCta: {
      eyebrow: text(entry.footerCta?.eyebrow, mockLandingPage.footerCta.eyebrow),
      heading: text(entry.footerCta?.heading, mockLandingPage.footerCta.heading),
      copy: text(entry.footerCta?.copy, mockLandingPage.footerCta.copy),
      primaryCta: link(entry.footerCta?.primaryCta, mockLandingPage.footerCta.primaryCta),
      secondaryCta: link(entry.footerCta?.secondaryCta, mockLandingPage.footerCta.secondaryCta)
    },
    contactConfig: normalizeContactConfig(entry.contactConfig)
  };
}

export async function getLandingPage(options: FetchOptions = {}): Promise<LandingPage> {
  if (useMockData) {
    return mockLandingPage;
  }

  try {
    const entry = await getLandingPageRaw(options);

    if (!entry) {
      throw new Error("The landing-page global is missing. Run `npm run seed:landing` after configuring the database.");
    }

    return normalizeLandingPage(entry);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Payload error";
    throw new Error(`Failed to load landing page from Payload. ${message}`);
  }
}
