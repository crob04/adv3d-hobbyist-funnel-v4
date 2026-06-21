import { BUSINESS_TIMEZONE } from "@/lib/business-contact";

const easternTimeFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: BUSINESS_TIMEZONE,
  weekday: "short",
  hour: "numeric",
  minute: "numeric",
  hourCycle: "h23"
});

export function isBusinessHoursEastern(date: Date = new Date()) {
  const parts = easternTimeFormatter.formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value;

  const weekday = get("weekday");
  const hour = Number(get("hour"));
  const minute = Number(get("minute"));

  if (!weekday || Number.isNaN(hour) || Number.isNaN(minute)) {
    return false;
  }

  const isWeekday = ["Mon", "Tue", "Wed", "Thu", "Fri"].includes(weekday);
  const minutesSinceMidnight = hour * 60 + minute;

  return isWeekday && minutesSinceMidnight >= 9 * 60 && minutesSinceMidnight < 17 * 60;
}
