import type { Block } from "payload";

export const FAQBlock: Block = {
  slug: "faq",
  labels: {
    singular: "FAQ",
    plural: "FAQ Blocks"
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
    {
      name: "items",
      type: "array",
      minRows: 1,
      labels: {
        singular: "Question",
        plural: "Questions"
      },
      fields: [
        {
          name: "question",
          type: "text",
          required: true
        },
        {
          name: "answer",
          type: "textarea",
          required: true
        },
        {
          name: "openByDefault",
          type: "checkbox",
          defaultValue: false
        }
      ]
    }
  ]
};
