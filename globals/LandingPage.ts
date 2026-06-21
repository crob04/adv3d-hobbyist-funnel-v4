import type { Field, GlobalConfig } from "payload";

import { linkField } from "../payload/fields/link.ts";

function requiredText(name: string, label: string, type: "text" | "textarea" = "text"): Field {
  if (type === "textarea") {
    return {
      name,
      label,
      type: "textarea",
      required: true
    };
  }

  return {
    name,
    label,
    type: "text",
    required: true
  };
}

function simpleCardArray(name: string, label: string): Field {
  return {
    name,
    label,
    type: "array",
    minRows: 1,
    fields: [
      requiredText("title", "Title"),
      {
        name: "copy",
        label: "Body Copy",
        type: "textarea"
      }
    ]
  };
}

export const LandingPageGlobal: GlobalConfig = {
  slug: "landing-page",
  label: "Landing Page",
  access: {
    read: () => true
  },
  fields: [
    requiredText("title", "Title"),
    requiredText("slug", "Slug"),
    {
      name: "seo",
      type: "group",
      fields: [
        requiredText("title", "SEO Title"),
        requiredText("description", "SEO Description", "textarea"),
        {
          name: "ogTitle",
          label: "Open Graph Title",
          type: "text"
        },
        {
          name: "ogDescription",
          label: "Open Graph Description",
          type: "textarea"
        }
      ]
    },
    {
      name: "hero",
      type: "group",
      fields: [
        {
          name: "eyebrow",
          label: "Eyebrow",
          type: "text"
        },
        requiredText("heading", "Headline", "textarea"),
        requiredText("subheading", "Subheadline", "textarea"),
        linkField("primaryCta", "Primary CTA"),
        linkField("secondaryCta", "Secondary CTA"),
        {
          name: "proofBullets",
          label: "Proof Bullets",
          type: "array",
          minRows: 1,
          maxRows: 7,
          fields: [requiredText("label", "Label")]
        }
      ]
    },
    {
      name: "problem",
      type: "group",
      fields: [
        {
          name: "eyebrow",
          label: "Eyebrow",
          type: "text"
        },
        requiredText("heading", "Headline", "textarea"),
        requiredText("copy", "Body Copy", "textarea"),
        {
          name: "items",
          label: "Pain Point Cards",
          type: "array",
          minRows: 4,
          maxRows: 4,
          fields: [
            requiredText("title", "Title"),
            requiredText("copy", "Body Copy", "textarea")
          ]
        }
      ]
    },
    {
      name: "differentiators",
      type: "group",
      fields: [
        {
          name: "eyebrow",
          label: "Eyebrow",
          type: "text"
        },
        requiredText("heading", "Headline", "textarea"),
        requiredText("copy", "Body Copy", "textarea"),
        simpleCardArray("items", "Feature Cards")
      ]
    },
    {
      name: "benefits",
      type: "group",
      fields: [
        {
          name: "eyebrow",
          label: "Eyebrow",
          type: "text"
        },
        requiredText("heading", "Headline", "textarea"),
        {
          name: "items",
          label: "Benefit Blocks",
          type: "array",
          minRows: 3,
          maxRows: 3,
          fields: [
            requiredText("title", "Title"),
            requiredText("copy", "Body Copy", "textarea")
          ]
        }
      ]
    },
    {
      name: "workflow",
      type: "group",
      fields: [
        {
          name: "eyebrow",
          label: "Eyebrow",
          type: "text"
        },
        requiredText("heading", "Headline", "textarea"),
        requiredText("introLine", "Intro Line", "textarea"),
        {
          name: "steps",
          label: "Workflow Steps",
          type: "array",
          minRows: 4,
          maxRows: 4,
          fields: [
            requiredText("step", "Step Label"),
            requiredText("title", "Title"),
            requiredText("copy", "Body Copy", "textarea")
          ]
        }
      ]
    },
    {
      name: "proof",
      type: "group",
      fields: [
        {
          name: "eyebrow",
          label: "Eyebrow",
          type: "text"
        },
        requiredText("heading", "Headline", "textarea"),
        {
          name: "items",
          label: "Proof Cards",
          type: "array",
          minRows: 3,
          maxRows: 3,
          fields: [requiredText("label", "Label")]
        }
      ]
    },
    {
      name: "faq",
      type: "group",
      fields: [
        requiredText("heading", "Headline", "textarea"),
        {
          name: "items",
          label: "FAQ Items",
          type: "array",
          minRows: 7,
          maxRows: 7,
          fields: [
            requiredText("question", "Question"),
            requiredText("answer", "Answer", "textarea"),
            {
              name: "openByDefault",
              label: "Open By Default",
              type: "checkbox",
              defaultValue: false
            }
          ]
        }
      ]
    },
    {
      name: "contact",
      type: "group",
      fields: [
        {
          name: "eyebrow",
          label: "Eyebrow",
          type: "text"
        },
        requiredText("heading", "Headline", "textarea"),
        requiredText("copy", "Body Copy", "textarea"),
        requiredText("primarySubmitLabel", "Primary Submit Label"),
        requiredText("secondarySubmitLabel", "Secondary Submit Label"),
        requiredText("successMessage", "Success Message", "textarea"),
        requiredText("errorMessage", "Error Message", "textarea")
      ]
    },
    {
      name: "footerCta",
      type: "group",
      fields: [
        {
          name: "eyebrow",
          label: "Eyebrow",
          type: "text"
        },
        requiredText("heading", "Headline", "textarea"),
        {
          name: "copy",
          label: "Body Copy",
          type: "textarea"
        },
        linkField("primaryCta", "Primary CTA"),
        linkField("secondaryCta", "Secondary CTA")
      ]
    },
    {
      name: "contactConfig",
      type: "group",
      fields: [
        {
          name: "staffEmailOverride",
          label: "Staff Notification Email Override (comma-separated)",
          type: "text"
        },
        {
          name: "fromNameOverride",
          label: "Sender Name Override",
          type: "text"
        },
        {
          name: "fromEmailOverride",
          label: "Sender Email Override",
          type: "email"
        },
        {
          name: "fallbackContactEmail",
          label: "Fallback Contact Email",
          type: "email"
        }
      ]
    }
  ]
};
