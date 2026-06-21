import type { Field } from "payload";

export function linkField(name: string, label: string): Field {
  return {
    name,
    label,
    type: "group",
    fields: [
      {
        name: "label",
        type: "text"
      },
      {
        name: "href",
        type: "text"
      },
      {
        name: "isExternal",
        type: "checkbox",
        defaultValue: false
      }
    ]
  };
}
