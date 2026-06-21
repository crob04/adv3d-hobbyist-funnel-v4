import type { Block } from "payload";

export const TestimonialsBlock: Block = {
  slug: "testimonials",
  labels: {
    singular: "Testimonials",
    plural: "Testimonials Blocks"
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
        singular: "Testimonial",
        plural: "Testimonials"
      },
      fields: [
        {
          name: "name",
          type: "text",
          required: true
        },
        {
          name: "role",
          type: "text",
          required: true
        },
        {
          name: "company",
          type: "text",
          required: true
        },
        {
          name: "quote",
          type: "textarea",
          required: true
        }
      ]
    }
  ]
};
