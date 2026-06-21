"use client";

import { useEffect, useState } from "react";

import { trackCallButtonClick } from "@/lib/analytics";
import { BUSINESS_NAME, BUSINESS_PHONE_DISPLAY, BUSINESS_PHONE_E164, BUSINESS_PHONE_HREF } from "@/lib/business-contact";
import { isBusinessHoursEastern } from "@/lib/business-hours";

export function BusinessHoursCallButton({ className = "" }: { className?: string }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let intervalId: number | undefined;
    let timeoutId: number | undefined;

    const syncVisibility = () => {
      setIsVisible(isBusinessHoursEastern());
    };

    const startMinuteChecks = () => {
      syncVisibility();
      intervalId = window.setInterval(syncVisibility, 60_000);
    };

    syncVisibility();
    timeoutId = window.setTimeout(startMinuteChecks, 60_000 - (Date.now() % 60_000) + 25);

    return () => {
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }

      if (intervalId !== undefined) {
        window.clearInterval(intervalId);
      }
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <a
      href={BUSINESS_PHONE_HREF}
      aria-label={`Call ${BUSINESS_NAME} at ${BUSINESS_PHONE_DISPLAY}`}
      className={`pill-button-primary cta-button-fixed min-h-11 justify-center ${className}`.trim()}
      onClick={() => trackCallButtonClick(BUSINESS_PHONE_E164)}
    >
      Call Our Digital O&amp;P Team
    </a>
  );
}
