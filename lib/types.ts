export type Link = {
  label: string;
  href: string;
  isExternal?: boolean;
};

export type InquiryType = "team_question";

export type Seo = {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
};

export type HeroProofBullet = {
  id: number;
  label: string;
};

export type SimpleCard = {
  id: number;
  title: string;
  copy?: string;
};

export type WorkflowStep = {
  id: number;
  step: string;
  title: string;
  copy: string;
};

export type ProofItem = {
  id: number;
  label: string;
};

export type FaqItem = {
  id: number;
  question: string;
  answer: string;
  openByDefault?: boolean;
};

export type HeroSection = {
  eyebrow?: string;
  heading: string;
  subheading: string;
  primaryCta: Link;
  secondaryCta: Link;
  proofBullets: HeroProofBullet[];
};

export type ProblemSection = {
  eyebrow?: string;
  heading: string;
  copy: string;
  items: SimpleCard[];
};

export type DifferentiatorsSection = {
  eyebrow?: string;
  heading: string;
  copy: string;
  items: SimpleCard[];
};

export type BenefitsSection = {
  eyebrow?: string;
  heading: string;
  items: SimpleCard[];
};

export type WorkflowSection = {
  eyebrow?: string;
  heading: string;
  introLine: string;
  steps: WorkflowStep[];
};

export type ProofSection = {
  eyebrow?: string;
  heading: string;
  items: ProofItem[];
};

export type FaqSection = {
  heading: string;
  items: FaqItem[];
};

export type ContactSection = {
  eyebrow?: string;
  heading: string;
  copy: string;
  primarySubmitLabel: string;
  secondarySubmitLabel: string;
  successMessage: string;
  errorMessage: string;
};

export type FooterCtaSection = {
  eyebrow?: string;
  heading: string;
  copy?: string;
  primaryCta: Link;
  secondaryCta: Link;
};

export type ContactConfig = {
  staffEmailOverride?: string;
  fromNameOverride?: string;
  fromEmailOverride?: string;
  fallbackContactEmail?: string;
};

export type LandingPage = {
  id: number;
  title: string;
  slug: string;
  seo: Seo;
  hero: HeroSection;
  problem: ProblemSection;
  differentiators: DifferentiatorsSection;
  benefits: BenefitsSection;
  workflow: WorkflowSection;
  proof: ProofSection;
  faq: FaqSection;
  contact: ContactSection;
  footerCta: FooterCtaSection;
  contactConfig: ContactConfig;
};

export type ContactRequest = {
  name: string;
  clinic: string;
  email: string;
  phone?: string;
  message?: string;
  inquiry_type: InquiryType;
  website_url?: string;
  rendered_at?: string;
};

export type ContactValidationErrors = Partial<Record<keyof ContactRequest, string>>;

export type ContactSuccessResponse = {
  ok: true;
  message: string;
};

export type ContactErrorResponse = {
  ok: false;
  message: string;
  errors?: ContactValidationErrors;
};
