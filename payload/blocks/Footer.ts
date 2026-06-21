import type { Block } from "payload";

export const FooterBlock: Block = {
  slug: "footer",
  labels: {
    singular: "Footer",
    plural: "Footer Blocks"
  },
  fields: [
    {
      name: "brandName",
      type: "text",
      required: true
    },
    {
      name: "copy",
      type: "textarea",
      required: true
    },
    {
      name: "links",
      type: "array",
      labels: {
        singular: "Link",
        plural: "Links"
      },
      fields: [
        {
          name: "label",
          type: "text",
          required: true
        },
        {
          name: "href",
          type: "text",
          required: true
        },
        {
          name: "isExternal",
          type: "checkbox",
          defaultValue: false
        }
      ]
    }
  ]
};
