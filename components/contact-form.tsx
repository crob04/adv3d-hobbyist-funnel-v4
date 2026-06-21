"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";

import { BusinessHoursCallButton } from "@/components/business-hours-call-button";
import {
  trackFormStart,
  trackFormSubmitAttempt,
  trackFormSubmitError,
  trackFormSubmitSuccess,
  trackPrimaryCtaClick,
  trackSecondaryCtaClick
} from "@/lib/analytics";
import {
  BUSINESS_ADDRESS,
  BUSINESS_NAME,
  BUSINESS_PHONE_DISPLAY
} from "@/lib/business-contact";
import type { ContactErrorResponse, ContactRequest, ContactSuccessResponse, InquiryType } from "@/lib/types";

type ContactFormState = {
  name: string;
  clinic: string;
  email: string;
  phone: string;
  message: string;
};

type ContactFormProps = {
  eyebrow?: string;
  title: string;
  copy: string;
  primarySubmitLabel: string;
  secondarySubmitLabel: string;
  successMessage: string;
  errorMessage: string;
  fallbackContactEmail?: string;
};

type FieldErrors = Partial<Record<keyof ContactRequest, string>>;

const initialState: ContactFormState = {
  name: "",
  clinic: "",
  email: "",
  phone: "",
  message: ""
};

const customerPortalHref = "https://advanc3dinc.com/amfg-customer-portal/";

function firstName(name: string) {
  return name.trim().split(/\s+/)[0] || "there";
}

function applySuccessTemplate(template: string, name: string) {
  return template.replace(/\{\{firstName\}\}/g, firstName(name));
}

function validate(values: ContactFormState): FieldErrors {
  const errors: FieldErrors = {};

  if (!values.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!values.clinic.trim()) {
    errors.clinic = "Clinic / Company is required.";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }

  return errors;
}

export function ContactForm({
  eyebrow,
  title,
  copy,
  primarySubmitLabel,
  secondarySubmitLabel,
  successMessage,
  errorMessage,
  fallbackContactEmail
}: ContactFormProps) {
  const [values, setValues] = useState<ContactFormState>(initialState);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [intent] = useState<InquiryType>("team_question");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successState, setSuccessState] = useState<string | null>(null);
  const renderedAtRef = useRef(new Date().toISOString());
  const startedRef = useRef(false);

  function updateField<K extends keyof ContactFormState>(key: K, value: ContactFormState[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) {
        return current;
      }

      const next = { ...current };
      delete next[key];
      return next;
    });
    setFormError(null);
  }

  function handleFormStart() {
    if (startedRef.current) {
      return;
    }

    startedRef.current = true;
    trackFormStart();
  }

  async function submit(intent: InquiryType) {
    const fieldErrors = validate(values);
    setErrors(fieldErrors);
    setFormError(null);

    trackFormSubmitAttempt(intent);

    if (Object.keys(fieldErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload: ContactRequest = {
        ...values,
        phone: values.phone.trim() || undefined,
        message: values.message.trim() || undefined,
        inquiry_type: intent,
        website_url: websiteUrl,
        rendered_at: renderedAtRef.current
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = (await response.json()) as ContactSuccessResponse | ContactErrorResponse;

      if (!response.ok || !data.ok) {
        const failure = data as ContactErrorResponse;
        if (failure.errors) {
          setErrors(failure.errors);
        }

        setFormError(
          failure.message || errorMessage || `Something went wrong. Please try again or contact us directly at ${fallbackContactEmail ?? "the Advanc3D team"}.`
        );
        trackFormSubmitError();
        return;
      }

      setSuccessState(applySuccessTemplate(successMessage, values.name));
      setErrors({});
      setFormError(null);
      trackFormSubmitSuccess(intent);
    } catch {
      setFormError(errorMessage || `Something went wrong. Please try again or contact us directly at ${fallbackContactEmail ?? "the Advanc3D team"}.`);
      trackFormSubmitError();
    } finally {
      setIsSubmitting(false);
    }
  }

  if (successState) {
    return (
      <div className="rounded-[2rem] border border-line bg-white p-8 shadow-[0_4px_18px_rgba(0,0,0,0.04)]">
        <p className="max-w-2xl text-lg font-medium leading-8 text-[#1a1a1a]">{successState}</p>
      </div>
    );
  }

  return (
    <form
      className="rounded-[2rem] border border-line bg-white p-6 shadow-[0_4px_18px_rgba(0,0,0,0.04)] md:p-8"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="max-w-3xl">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 className="mt-4 font-display text-4xl leading-tight text-ink md:text-5xl">{title}</h2>
        <p className="mt-4 text-base leading-7 text-mist md:text-lg">{copy}</p>
        <p className="mt-5 rounded-2xl border border-line bg-[#f7f7f7] px-4 py-3 text-base font-semibold leading-7 text-ink">
          Do you already have an account? Request a quote, submit a new order, or check the status of an existing order via the{" "}
          <a
            href={customerPortalHref}
            target="_blank"
            rel="noreferrer"
            className="text-[#d67a14] underline decoration-[rgba(214,122,20,0.35)] underline-offset-4 hover:text-[#1a1a1a]"
            onClick={() => trackSecondaryCtaClick("form_section")}
          >
            Customer Portal
          </a>
        </p>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-[1.5rem] border border-line bg-[#f7f7f7] p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-mist">Phone Support</p>
          <p className="mt-3 text-2xl font-semibold leading-tight text-ink">{BUSINESS_PHONE_DISPLAY}</p>
          <p className="mt-3 text-sm leading-6 text-mist">Available Monday through Friday, 9:00 AM to 5:00 PM Eastern.</p>
          <BusinessHoursCallButton className="mt-5 sm:w-full" />
        </div>

        <div className="rounded-[1.5rem] border border-line bg-[#f7f7f7] p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-mist">Mailing Address</p>
          <address className="mt-3 not-italic text-base leading-7 text-ink">
            <span className="block font-semibold">{BUSINESS_NAME}</span>
            <span className="block">{BUSINESS_ADDRESS.streetAddress}</span>
            <span className="block">
              {BUSINESS_ADDRESS.addressLocality}, {BUSINESS_ADDRESS.addressRegion} {BUSINESS_ADDRESS.postalCode}
            </span>
            <span className="block">USA</span>
          </address>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Field label="Name" name="name" error={errors.name}>
          <input
            value={values.name}
            onFocus={handleFormStart}
            onChange={(event) => updateField("name", event.target.value)}
            className="form-input"
            autoComplete="name"
          />
        </Field>
        <Field label="Clinic / Company" name="clinic" error={errors.clinic}>
          <input
            value={values.clinic}
            onFocus={handleFormStart}
            onChange={(event) => updateField("clinic", event.target.value)}
            className="form-input"
            autoComplete="organization"
          />
        </Field>
        <Field label="Email" name="email" error={errors.email}>
          <input
            value={values.email}
            onFocus={handleFormStart}
            onChange={(event) => updateField("email", event.target.value)}
            className="form-input"
            autoComplete="email"
            inputMode="email"
          />
        </Field>
        <Field label="Phone (Optional)" name="phone" error={errors.phone}>
          <input
            value={values.phone}
            onFocus={handleFormStart}
            onChange={(event) => updateField("phone", event.target.value)}
            className="form-input"
            autoComplete="tel"
            inputMode="tel"
          />
        </Field>
        <Field label="Tell us how we can assist you" name="message" error={errors.message} className="md:col-span-2">
          <textarea
            value={values.message}
            onFocus={handleFormStart}
            onChange={(event) => updateField("message", event.target.value)}
            className="form-input min-h-36"
            rows={6}
          />
        </Field>
      </div>
      <input type="hidden" name="inquiry_type" value={intent} />
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input
            type="text"
            name="website_url"
            value={websiteUrl}
            onChange={(event) => setWebsiteUrl(event.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      {formError ? <p className="mt-4 text-sm font-medium text-red-700">{formError}</p> : null}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={isSubmitting}
          className="pill-button-primary cta-button-fixed min-h-11 justify-center disabled:cursor-not-allowed disabled:opacity-70"
          onClick={() => {
            trackPrimaryCtaClick("form_section");
            void submit("team_question");
          }}
        >
          {isSubmitting ? "Sending..." : primarySubmitLabel}
        </button>
        <a
          href={customerPortalHref}
          target="_blank"
          rel="noreferrer"
          className="pill-button-secondary cta-button-fixed min-h-11 justify-center"
          onClick={() => {
            trackSecondaryCtaClick("form_section");
          }}
        >
          {secondarySubmitLabel}
        </a>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  className,
  children
}: {
  label: string;
  name: keyof ContactRequest;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="mb-2 block text-[0.95rem] font-semibold text-ink">{label}</span>
      {children}
      {error ? <span className="mt-2 block text-sm text-red-700">{error}</span> : null}
    </label>
  );
}
