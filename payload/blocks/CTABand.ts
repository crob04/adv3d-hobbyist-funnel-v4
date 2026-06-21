import type { Block } from "payload";

import { linkField } from "../fields/link.ts";

export const CTABandBlock: Block = {
  slug: "ctaBand",
  labels: {
    singular: "CTA Band",
    plural: "CTA Band Blocks"
  },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      required: true
    },
    {
      name: "heading",
      type: "textarea",
      required: true
    },
    {
      name: "copy",
      type: "textarea",
      required: true
    },
    linkField("primaryCta", "Primary CTA"),
    linkField("secondaryCta", "Secondary CTA")
  ]
};
