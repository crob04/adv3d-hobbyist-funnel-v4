import Image from "next/image";

import {
  BenefitsSectionView,
  DifferentiatorsSectionView,
  HeroSectionView,
  ProblemGridSection,
  ProofSectionView,
  WorkflowSectionView
} from "@/components/adv3d-sections";
import { ContactForm } from "@/components/contact-form";
import { PageAnalytics } from "@/components/page-analytics";
import type { LandingPage } from "@/lib/types";

const isMockMode = process.env.USE_MOCK_DATA === "true";

function BrandLogoLockup({ priority = false }: { priority?: boolean }) {
  return (
    <div className="brand-logo-lockup inline-flex max-w-full items-center rounded-[1.75rem] border border-line bg-white px-4 py-3 shadow-[0_4px_18px_rgba(0,0,0,0.04)] md:px-5">
      <Image
        src="/brand/advanced3d-logo.jpg"
        alt="Advanced 3D"
        width={600}
        height={167}
        priority={priority}
        className="h-auto w-[170px] md:w-[220px]"
      />
    </div>
  );
}

export function PageRenderer({ page }: { page: LandingPage }) {
  return (
    <main>
      <PageAnalytics />
      {isMockMode ? (
        <div className="mx-auto mt-6 w-full max-w-7xl rounded-2xl border border-line bg-[#f5f7fa] px-5 py-4 text-sm font-medium text-[#1a1a1a] md:px-6">
          Mock mode is enabled. This page is rendering fallback content because `USE_MOCK_DATA=true`.
        </div>
      ) : null}

      <section className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 pt-6 md:px-10">
        <BrandLogoLockup priority />
        <div className="hidden text-right md:block">
          <p className="max-w-sm text-base font-medium leading-6 text-[#1a1a1a]">
            Stronger sockets. Lighter orthoses. Faster turnaround. Better Outcomes.
          </p>
        </div>
      </section>

      <HeroSectionView section={page.hero} />
      <ProblemGridSection section={page.problem} />
      <DifferentiatorsSectionView section={page.differentiators} />
      <BenefitsSectionView section={page.benefits} />
      <WorkflowSectionView section={page.workflow} />
      <ProofSectionView section={page.proof} />

      <section id="contact-form" className="section-shell scroll-mt-8">
        <div className="mx-auto max-w-5xl">
          <ContactForm
            eyebrow={page.contact.eyebrow}
            title={page.contact.heading}
            copy={page.contact.copy}
            primarySubmitLabel={page.contact.primarySubmitLabel}
            secondarySubmitLabel={page.contact.secondarySubmitLabel}
            successMessage={page.contact.successMessage}
            errorMessage={page.contact.errorMessage}
            fallbackContactEmail={page.contactConfig.fallbackContactEmail}
          />
        </div>
      </section>
    </main>
  );
}
