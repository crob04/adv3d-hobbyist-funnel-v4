"use client";

import { useEffect } from "react";

import { SITE_CONFIG } from "./site-config";
import type { InquiryType } from "./types";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

type CtaLocation = "hero" | "form_section" | "footer" | "sticky_mobile";

const gaId = process.env.NEXT_PUBLIC_GA_ID;

function canTrack() {
  return typeof window !== "undefined" && Boolean(gaId);
}

function track(eventName: string, params?: Record<string, unknown>) {
  if (!canTrack()) {
    return;
  }

  window.dataLayer ??= [];
  window.dataLayer.push({ event: eventName, ...params });

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

export function trackPrimaryCtaClick(cta_location: CtaLocation) {
  track("cta_click_primary", { cta_location });
}

export function trackSecondaryCtaClick(cta_location: Exclude<CtaLocation, "sticky_mobile">) {
  track("cta_click_secondary", { cta_location });
}

export function trackCallButtonClick(phone_number: string) {
  track("click_call_button", { phone_number, site_section: SITE_CONFIG.audienceKey });
}

export function trackFormStart() {
  track("form_start");
}

export function trackFormSubmitAttempt(inquiry_type: InquiryType) {
  track("form_submit_attempt", { inquiry_type });
}

export function trackFormSubmitSuccess(inquiry_type: InquiryType) {
  track("form_submit_success", { inquiry_type });
}

export function trackFormSubmitError() {
  track("form_submit_error");
}

export function trackFaqExpand(question_index: number) {
  track("faq_expand", { question_index });
}

export function useScrollDepthTracking() {
  useEffect(() => {
    if (!canTrack()) {
      return;
    }

    let fired50 = false;
    let fired90 = false;

    function onScroll() {
      const scrollTop = window.scrollY;
      const viewport = window.innerHeight;
      const height = document.documentElement.scrollHeight;
      const depth = height > viewport ? (scrollTop / (height - viewport)) * 100 : 100;

      if (!fired50 && depth >= 50) {
        fired50 = true;
        track("scroll_depth_50");
      }

      if (!fired90 && depth >= 90) {
        fired90 = true;
        track("scroll_depth_90");
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}
