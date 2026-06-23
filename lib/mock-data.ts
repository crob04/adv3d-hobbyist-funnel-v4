import type { LandingPage } from "./types";

export const landingPage: LandingPage = {
  businessName: "Adv3D",
  phoneDisplay: "(252) 208-9575",
  phoneHref: "tel:+125****9575",
  seo: {
    title: "Send a file. Hold the part this week. | Adv3D",
    description:
      "Adv3D prints one-offs and short runs in FDM, resin, SLS, and TPU. Quote in 24 hours, production in 3 to 5 business days, no minimum order.",
    ogTitle: "Send a file. Hold the part this week.",
    ogDescription:
      "One-offs and short runs in FDM, resin, SLS, and TPU. Quote in 24 hours, production in 3 to 5 business days."
  },
  navItems: [
    { label: "Why us", href: "#why-us" },
    { label: "What you get", href: "#what-you-get" },
    { label: "How it works", href: "#how-it-works" },
    { label: "FAQ", href: "#faq" }
  ],
  hero: {
    heading: "Send a file. Hold the part this week.",
    subheading:
      "After using ADV3D, you finally have the part you actually imagined — in your hands, on your workbench, before your project goes cold. We print in FDM, resin, and TPU. One piece or one hundred.",
    primaryCta: { label: "Send me a file", href: "#final-cta" },
    secondaryCta: { label: "Get a quote in 24 hours", href: "#final-cta" },
    image: {
      src: "/images/hero.jpg",
      alt: "3D printer in operation building a plastic part, in a workshop setting"
    }
  },
  problem: {
    heading: "The home printer hits a wall around hour six.",
    copy: "You have the file, you sliced it, you set the bed, you watched the first layer go down clean. Then the part warps off the build plate at hour five, or the layers start delaminating. The supports fused into the surface and the detail is gone. The PLA snapped under load and you realize you needed PETG. The print failed, the day is gone, and you're back to the slicer arguing with retraction settings."
  },
  whyUs: {
    heading: "What you get when you stop printing it yourself.",
    subheading: "Three reasons hobbyists send us the file.",
    image: {
      src: "/images/why-us.jpg",
      alt: "3D printer mechanical components in a workshop, showcasing the technology"
    },
    rows: [
      {
        title: "Materials beyond the hobby FDM shelf.",
        copy: "PETG, PLA, ABS — that's the menu on a hobby FDM. We also run PA-CF, MJF nylon, PolyJet, and SLA resin, plus TPU at multiple shore hardnesses. If the part needs to flex without cracking, hold a thread under load, or come off the build plate at a tight tolerance, that's where we start.",
        bullets: [
          "PA-CF for stiff, lightweight brackets and arms",
          "TPU at multiple shore hardnesses for vibration-damping mounts"
        ]
      },
      {
        title: "Days, not weeks.",
        copy: "Most jobs quote in 24 hours and ship in three to five business days. You send the file Monday, you're holding the part before the weekend. We run FDM, resin, and SLS at the same time, so jobs finish when the slowest step finishes — not when the queue ahead of yours does. If we say Friday, we mean Friday.",
        bullets: [
          "Quote turnaround: under 24 hours for most files",
          "Production to ship: typically 3 to 5 business days"
        ]
      },
      {
        title: "One piece is fine. Twenty is fine.",
        copy: "No minimum order, no gated quote form. One bracket, one figurine, one prototype — all the same workflow. We also handle post-processing in-house: support removal, sanding, vapor smoothing for ABS, basic paint-prep. You get a part that's ready to bolt on or paint, not a tree of support stubs to clean up yourself.",
        bullets: [
          "No MOQ — one-offs and short runs cost the same per piece",
          "In-house post-processing: support removal, sanding, vapor smoothing, paint-prep"
        ]
      }
    ],
    primaryCta: { label: "Send me a file", href: "#final-cta" }
  },
  whatYouGet: {
    heading: "What lands in the mail.",
    subheading: "A print, a finish, and a tracking number.",
    leadCard: {
      title: "The part itself.",
      copy: "Functional FDM, fine-detail resin, or flexible TPU — whichever your use case needs. We pick the process and material based on what the part has to do, not what's cheapest to run.",
      image: {
        src: "/images/what-you-get-1-drone.jpg",
        alt: "Drone kit with controller and spare propellers — example of precision 3D-printed functional parts"
      }
    },
    secondaryCards: [
      {
        title: "The finish, not the supports.",
        copy: "Supports removed. Surfaces sanded. Threads tapped if needed. You get a part that's ready to install, not a build plate's worth of cleanup.",
        image: {
          src: "/images/what-you-get-3-mount.jpg",
          alt: "Bicycle phone mount attached to a handlebar — example of a flexible TPU 3D-printed part"
        }
      },
      {
        title: "The turnaround, in days.",
        copy: "Quote in under 24 hours. Production in 3 to 5 business days. We send tracking when it ships. If the timeline changes, we tell you before you have to ask.",
        image: {
          src: "/images/what-you-get-2-mini.jpg",
          alt: "Painted tabletop role-playing game miniature figures and dice — example of full-color 3D printing"
        }
      }
    ],
    primaryCta: { label: "Send me a file", href: "#final-cta" }
  },
  howItWorks: {
    heading: "From file to finished part in four steps.",
    steps: [
      {
        step: "01",
        title: "Send the file.",
        copy: "Upload your STL or STEP. Drag, drop, done. We accept the file formats every hobby CAD package exports."
      },
      {
        step: "02",
        title: "We review and quote.",
        copy: "We check walls, overhangs, tolerance, and material fit. You get a price and a ship date within 24 hours."
      },
      {
        step: "03",
        title: "You approve.",
        copy: "Lock the quote. Pay when you're ready. No hidden fees, no surprises."
      },
      {
        step: "04",
        title: "We print and ship.",
        copy: "Production to your door in 3 to 5 business days. Tracking included."
      }
    ],
    primaryCta: { label: "Send me a file", href: "#final-cta" }
  },
  proof: {
    heading: "Prints we've shipped this month.",
    subheading: "Functional parts, tabletop minis, custom mounts — actual jobs, not stock renders.",
    body: "We don't crop smiley faces onto strangers or invent stats. The parts above are real jobs we shipped, in resin, FDM, and TPU. We post new finished-part photos every week. Send us your file and your print joins the shelf. If you're wondering whether it will look as good as the photo — yes. We shoot the actual print before it ships, so what you see is what lands in the box. If anything is off (warping, supports fused to the surface, first-layer squish), we flag it before you pay for shipping.",
    caption: "A multi-piece resin print, supports removed, surfaces prepped for paint.",
    image: {
      src: "/images/proof.jpg",
      alt: "Detailed 3D-printed architectural city model showing layered precision and quality"
    },
    primaryCta: { label: "Send me a file", href: "#final-cta" }
  },
  faq: {
    heading: "Frequently asked.",
    subheading: "Six things hobbyists ask before sending the file.",
    items: [
      {
        question: "Will it actually look as good as the photo?",
        answer: "Yes — we shoot the actual print before it ships, so the photo in your update is the part in the box. If anything is off (warping, supports fused to the surface, first-layer squish), we tell you before you pay for shipping."
      },
      {
        question: "How fast will it ship?",
        answer: "Quote in under 24 hours for most files. Production runs 3 to 5 business days after approval. If a job needs longer — large SLS builds, vapor-smoothed ABS — we tell you up front."
      },
      {
        question: "Why not just buy a better home printer?",
        answer: "A $1,200 home printer handles a lot. The ceiling is material breadth: PA-CF, MJF nylon, fine-detail resin at scale, and TPU at consistent shore hardness aren't on that menu. We run them because we print enough volume to keep the settings dialed in. One bracket or one hundred, the result is the same part."
      },
      {
        question: "What's the smallest job you'll take?",
        answer: "One piece. We don't have a minimum. Single prototypes, one-off replacement parts, and short runs are all priced the same way — per piece, by material and time."
      },
      {
        question: "Can you match a color or finish?",
        answer: "We stock a standard range of PLA, PETG, and ABS colors. For resin we offer natural, gray, and a paintable white. Custom Pantone matching is possible on short runs — ask for a quote."
      },
      {
        question: "What if my file isn't print-ready?",
        answer: "Send it anyway. We'll flag walls that are too thin, overhangs that need support, and tolerances that won't hold. If a redesign would save you a failed print, we suggest it before we start the printer."
      }
    ],
    closingLine: "Still have questions. Send us a message or upload your file to get a quote.",
    primaryCta: { label: "Send me a file", href: "#final-cta" }
  },
  finalCta: {
    heading: "Send the file. Hold the part this week.",
    subheading: "Most quotes back in 24 hours. Most jobs shipping in 3 to 5 days. We print one-offs and short runs in FDM, resin, SLS, and TPU.",
    primaryCta: { label: "Send me a file", href: "#final-cta" },
    secondaryCta: { label: "Get a quote in 24 hours", href: "#final-cta" }
  }
};