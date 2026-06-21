import { getLandingPage } from "@/lib/payload";
import type { ContactErrorResponse, ContactRequest, ContactSuccessResponse } from "@/lib/types";

const brevoUrl = "https://api.brevo.com/v3/smtp/email";
const defaultFromName = "Advanc3D Digital O&P Solutions";
const minimumSubmitMs = 2500;

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validate(body: Partial<ContactRequest>) {
  const errors: ContactErrorResponse["errors"] = {};

  if (!body.name?.trim()) {
    errors.name = "Name is required.";
  }

  if (!body.clinic?.trim()) {
    errors.clinic = "Clinic / Company is required.";
  }

  if (!body.email?.trim()) {
    errors.email = "Email is required.";
  } else if (!isEmail(body.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (body.phone && typeof body.phone !== "string") {
    errors.phone = "Phone must be a string.";
  }

  if (body.message && typeof body.message !== "string") {
    errors.message = "Message must be a string.";
  }

  if (body.website_url && typeof body.website_url !== "string") {
    errors.website_url = "Invalid request.";
  }

  if (body.rendered_at && typeof body.rendered_at !== "string") {
    errors.rendered_at = "Invalid request.";
  }

  if (body.inquiry_type !== "team_question") {
    errors.inquiry_type = "Inquiry type is required.";
  }

  return errors;
}

function successMessage(message: string) {
  return Response.json({
    ok: true,
    message
  });
}

function isLikelyBot(body: Partial<ContactRequest>) {
  if (body.website_url?.trim()) {
    return true;
  }

  if (!body.rendered_at) {
    return true;
  }

  const renderedAt = Date.parse(body.rendered_at);

  if (!Number.isFinite(renderedAt)) {
    return true;
  }

  return Date.now() - renderedAt < minimumSubmitMs;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function parseEmails(value?: string) {
  return (value || "")
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .filter(isEmail);
}

function formatTimestamp() {
  return new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/New_York"
  });
}

async function sendBrevoEmail(apiKey: string, payload: Record<string, unknown>) {
  const response = await fetch(brevoUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const body = await response.text();
    console.error("Brevo email send failed", { status: response.status, body });
    throw new Error("Brevo send failed");
  }
}

export async function POST(request: Request) {
  const brevoApiKey = process.env.BREVO_API_KEY?.trim();
  const defaultStaffEmails = parseEmails(process.env.BREVO_STAFF_EMAIL);
  const envFromEmail = process.env.BREVO_FROM_EMAIL?.trim();
  const envStaffFromEmail = process.env.BREVO_STAFF_FROM_EMAIL?.trim() || envFromEmail;
  const envFromName = process.env.BREVO_FROM_NAME?.trim() || defaultFromName;

  if (!brevoApiKey || !envFromEmail || !envStaffFromEmail) {
    console.error("Missing Brevo configuration");

    return Response.json(
      {
        ok: false,
        message: "Something went wrong. Please try again later."
      },
      { status: 500 }
    );
  }

  let payload: Partial<ContactRequest>;

  try {
    payload = (await request.json()) as Partial<ContactRequest>;
  } catch {
    return Response.json(
      {
        ok: false,
        message: "Invalid request body."
      },
      { status: 400 }
    );
  }

  const errors = validate(payload);

  if (Object.keys(errors).length > 0) {
    return Response.json(
      {
        ok: false,
        message: "Please fix the highlighted fields.",
        errors
      },
      { status: 400 }
    );
  }

  const landingPage = await getLandingPage();
  const errorMessage = landingPage.contact.errorMessage || "Something went wrong. Please try again or contact us directly.";

  if (isLikelyBot(payload)) {
    console.warn("Contact submission blocked by anti-spam checks");
    return successMessage(landingPage.contact.successMessage.replace(/\{\{firstName\}\}/g, payload.name?.trim().split(/\s+/)[0] || "there"));
  }

  const confirmationFromEmail = landingPage.contactConfig.fromEmailOverride || envFromEmail;
  const fromName = landingPage.contactConfig.fromNameOverride || envFromName;
  const staffEmails = parseEmails(landingPage.contactConfig.staffEmailOverride).length
    ? parseEmails(landingPage.contactConfig.staffEmailOverride)
    : defaultStaffEmails;

  if (!staffEmails.length) {
    console.error("Missing staff email configuration");

    return Response.json(
      {
        ok: false,
        message: errorMessage
      },
      { status: 500 }
    );
  }

  const body = payload as ContactRequest;
  const safeName = escapeHtml(body.name.trim());
  const safeClinic = escapeHtml(body.clinic.trim());
  const safeEmail = escapeHtml(body.email.trim());
  const safePhone = body.phone?.trim() ? escapeHtml(body.phone.trim()) : "Not provided";
  const safeMessage = body.message?.trim() ? escapeHtml(body.message.trim()) : "Not provided";
  const safeInquiryLabel = "Team Question";
  const timestamp = formatTimestamp();

  try {
    await Promise.all([
      sendBrevoEmail(brevoApiKey, {
        sender: {
          email: envStaffFromEmail,
          name: fromName
        },
        to: staffEmails.map((email) => ({ email })),
        subject: `New Advanc3D Contact Form — ${safeInquiryLabel} from ${body.name.trim()} at ${body.clinic.trim()}`,
        htmlContent: `
          <div style="font-family:Arial,sans-serif;color:#0c0c0c;line-height:1.6">
            <h2 style="margin-bottom:16px">New Advanc3D Contact Form Message</h2>
            <p><strong>Inquiry Type:</strong> ${safeInquiryLabel}</p>
            <p><strong>Timestamp:</strong> ${escapeHtml(timestamp)}</p>
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Clinic / Company:</strong> ${safeClinic}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Phone:</strong> ${safePhone}</p>
            <p><strong>Patient situation, project, or question:</strong><br/>${safeMessage}</p>
          </div>
        `
      }),
      sendBrevoEmail(brevoApiKey, {
        sender: {
          email: confirmationFromEmail,
          name: fromName
        },
        to: [{ email: body.email.trim(), name: body.name.trim() }],
        subject: "We received your question — Advanc3D Digital O&P Solutions",
        htmlContent: `
          <div style="font-family:Arial,sans-serif;color:#0c0c0c;line-height:1.6">
            <h2 style="margin-bottom:16px">Thank you, ${escapeHtml(body.name.trim().split(/\s+/)[0] || "there")}.</h2>
            <p>We received your message.</p>
            <p>A member of the Advanc3D team will review it and follow up directly.</p>
            <p>If you need anything in the meantime, you can reply to this email.</p>
          </div>
        `
      })
    ]);

    return Response.json({
      ok: true,
      message: landingPage.contact.successMessage.replace(/\{\{firstName\}\}/g, body.name.trim().split(/\s+/)[0] || "there")
    });
  } catch (error) {
    console.error("Contact route failed", error);

    return Response.json(
      {
        ok: false,
        message: errorMessage
      },
      { status: 500 }
    );
  }
}
