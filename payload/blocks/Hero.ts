import type { Block } from "payload";

import { linkField } from "../fields/link.ts";

export const HeroBlock: Block = {
  slug: "hero",
  labels: {
    singular: "Hero",
    plural: "Hero Blocks"
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
    linkField("secondaryCta", "Secondary CTA"),
    {
      name: "stats",
      type: "array",
      labels: {
        singular: "Stat",
        plural: "Stats"
      },
      fields: [
        {
          name: "label",
          type: "text",
          required: true
        },
        {
          name: "value",
          type: "text",
          required: true
        }
      ]
    }
  ]
};
