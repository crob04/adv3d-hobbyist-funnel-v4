import type { Block } from "payload";

export const FeatureGridBlock: Block = {
  slug: "featureGrid",
  labels: {
    singular: "Feature Grid",
    plural: "Feature Grid Blocks"
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
        singular: "Feature",
        plural: "Features"
      },
      fields: [
        {
          name: "kicker",
          type: "text",
          required: true
        },
        {
          name: "title",
          type: "text",
          required: true
        },
        {
          name: "copy",
          type: "textarea",
          required: true
        }
      ]
    }
  ]
};
