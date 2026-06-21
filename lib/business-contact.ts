export const BUSINESS_NAME = "Advanc3D";
export const BUSINESS_PHONE_DISPLAY = "(252) 208-9575";
export const BUSINESS_PHONE_E164 = "+12522089575";
export const BUSINESS_PHONE_HREF = `tel:${BUSINESS_PHONE_E164}`;
export const BUSINESS_TIMEZONE = "America/New_York";

export const BUSINESS_ADDRESS = {
  streetAddress: "310 Airport Rd.",
  addressLocality: "Kinston",
  addressRegion: "NC",
  postalCode: "28504",
  addressCountry: "US"
} as const;

export const BUSINESS_HOURS = {
  opens: "09:00",
  closes: "17:00",
  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
} as const;
