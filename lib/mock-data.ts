import type { LandingPage } from "./types.ts";

export const mockLandingPage: LandingPage = {
  id: 1,
  title: "Advanc3D Digital O&P Solutions",
  slug: "home",
  seo: {
    title: "Prosthetic & Orthotic Fabrication | Advanc3D",
    description:
      "Advanc3D designs, engineers, and manufactures advanced O&P components — strong 3D sockets, lightweight flexible liners, and Nitro socket systems. Get a fabrication quote today.",
    ogTitle: "Prosthetic & Orthotic Fabrication | Advanc3D",
    ogDescription:
      "Advanc3D designs, engineers, and manufactures advanced O&P components — strong 3D sockets, lightweight flexible liners, and Nitro socket systems. Get a fabrication quote today."
  },
  hero: {
    eyebrow: "US-Based Digital Prosthetic & Orthotic Fabrication",
    heading: "High-Performance, Patient-Ready O&P Interventions",
    subheading:
      "Advanc3D designs, engineers, and manufactures complete prostheses and orthoses, sockets, flexible liners, and custom components to meet your patient’s unique needs Partner with Advanc3D for fabrication that delivers speed, precision, consistency, and clinician-to-clinician support.",
    primaryCta: {
      label: "Get a Fabrication Quote",
      href: "#contact-form"
    },
    secondaryCta: {
      label: "Connect With Our Team",
      href: "#contact-form"
    },
    proofBullets: [
      { id: 1, label: "Definitive Prostheses" },
      { id: 2, label: "Custom Orthoses" },
      { id: 3, label: "Multidurometer Flexible Liners" },
      { id: 4, label: "Custom Components" },
      { id: 5, label: "Diagnostic Sockets" },
      { id: 6, label: "Nitro Volume-Adjustable Sockets" },
      { id: 7, label: "Monolithic Partial Foot Prostheses" }
    ]
  },
  problem: {
    eyebrow: "THE PROBLEM",
    heading: "You’ve Gone Digital, But Fabrication Still Gets in the Way.",
    copy:
      "Most O&P clinicians already know digital fabrication belongs in patient care. The challenge is finding fabrication that actually supports modern clinical demands across complex patients, case types, and component needs.\n\nIn-house production can pull teams away from patients, while general fabrication vendors often miss the clinical realities of fit, function, durability, adjustability, and patient-specific outcomes. When quality, speed, precision, advanced capability, and clinician support do not align, clinics are pushed back toward traditional fabrication even when digital should be the better path.",
    items: [
      {
        id: 1,
        title: "In-House Digital Pulls Focus From Patient Care",
        copy:
          "Managing design, production, finishing, troubleshooting, and backlog takes time away from patients—often with equipment that limits advanced case capability and consistent results."
      },
      {
        id: 2,
        title: "General Fabricators Don’t Understand O&P Care",
        copy:
          "Fast parts are not enough. Fit, function, adjustability, durability, and patient-specific outcomes require a partner who understands the clinical realities of O&P."
      },
      {
        id: 3,
        title: "Limited Capability Leaves Complex Cases Behind",
        copy:
          "When an in-house team or outside partner cannot support advanced orthoses, prostheses, or components, clinicians are left feeling like traditional fabrication is their only option."
      },
      {
        id: 4,
        title: "Quality, Speed, Precision, and Support Rarely Align",
        copy:
          "Clinics should not have to choose between turnaround, repeatability, advanced fabrication capability, and responsive clinician support. Modern O&P requires all of them."
      }
    ]
  },
  differentiators: {
    eyebrow: "WHY ADVANC3D",
    heading: "Modern O&P Care, Powered by Advanced Manufacturing",
    copy:
      "Modern O&P is digital, demanding, and patient-focused. Clinicians need fabrication that gives time back to patient care—precise, repeatable, scalable, and clinically informed, without turning the care team into a production department.\n\nAdvanc3D combines multi-industry additive manufacturing expertise with experienced, board-certified, digital-first O&P clinicians. That means advanced manufacturing tools and disciplined production processes applied with a real clinical understanding of fit, function, durability, adjustability, and patient outcomes.",
    items: [
      {
        id: 1,
        title: "Cross-Industry Manufacturing Expertise",
        copy:
          "Advanc3D applies additive manufacturing experience from medical, manufacturing, automotive, and consumer goods to bring broader production discipline into O&P care."
      },
      {
        id: 2,
        title: "O&P Clinical Expertise Built In",
        copy:
          "Board-certified, digital-first O&P clinicians help ensure fabrication decisions support fit, function, durability, adjustability, and real patient needs."
      },
      {
        id: 3,
        title: "Advanced Platforms & Materials",
        copy:
          "[HP MJF](https://www.hp.com/us-en/printers/3d-printers/products/multi-jet-technology.html), full-color MJF output, [Formlabs SLS](https://formlabs.com/3d-printers/fuse-1/), PK 5000 selective laser sintering, PA-12 nylon, TPU elastomers, and Class VI biocompatibility options support a wider range of modern O&P applications."
      },
      {
        id: 4,
        title: "Design-to-Finish Production",
        copy:
          "3D scanning, design, reverse-engineering, prototyping, bridge production, short-run production, and finishing options help move components from concept to patient-ready output."
      }
    ]
  },
  benefits: {
    eyebrow: "WHAT YOU GET",
    heading: "What You Get When You Work With Advanc3D",
    items: [
      {
        id: 1,
        title: "Faster Turnaround, Guided From the Start",
        copy:
          "From case review to finished component, Advanc3D helps clinicians move faster with responsive design support and fewer production delays."
      },
      {
        id: 2,
        title: "Repeatable, Clinically Informed Output",
        copy:
          "Controlled manufacturing processes and O&P-aware design guidance help reduce variability, rework, and guesswork from case to case."
      },
      {
        id: 3,
        title: "More Design Freedom With Expert Support",
        copy:
          "Advanced materials, additive manufacturing, and clinician-guided design support help bring complex, adjustable, patient-specific solutions to life."
      }
    ]
  },
  workflow: {
    eyebrow: "THE PROCESS",
    heading: "How It Works",
    introLine:
      "Whether you submit a raw scan or detailed ready to print digital files, our process ensures quality ready-to-fit orthoses, prostheses, and components.",
    steps: [
      {
        id: 1,
        step: "01",
        title: "Submit Your Order",
        copy: "Submit your order using any common CAD format, scans, specs, or design intent. The digital O&P team reviews the information and follows up with a quote."
      },
      {
        id: 2,
        step: "02",
        title: "We Engineer the Design",
        copy: "The digital O&P team will review your order and ensure your submitted files are modified and optimized to meet the patient's unique needs."
      },
      {
        id: 3,
        step: "03",
        title: "We Manufacture It",
        copy: "The component is produced using the right additive process and material choice(s), then post-processed and finished for the application."
      },
      {
        id: 4,
        step: "04",
        title: "Your Order Arrives Ready-To-Fit",
        copy: "Quality assurance is completed before delivery, so your clinic receives a ready-to-fit orthosis, prosthesis, or component built through processes you and your patient can trust."
      }
    ]
  },
  proof: {
    eyebrow: "CAPABILITY",
    heading: "Proven Results That Exceed Expectations",
    items: [
      { id: 1, label: "Precision Fit & Finish for Clinical Accuracy" },
      { id: 2, label: "Advanced Manufacturing Processes for O&P Care" },
      { id: 3, label: "Clinical Expertise for Complex Patient Needs" }
    ]
  },
  faq: {
    heading: "Frequently Asked Questions",
    items: [
      {
        id: 1,
        question: "What types of O&P cases can Advanc3D support?",
        answer:
          "Advanc3D supports a range of prosthetic and orthotic fabrication needs, including strong 3D socket production, lightweight flexible liner manufacturing, and Nitro socket systems. Submit your case and the team can confirm fit and scope.",
        openByDefault: false
      },
      {
        id: 2,
        question: "Can you work from scans or existing digital files?",
        answer:
          "Yes. Advanc3D can work from patient scans, CAD files, or design intent documentation depending on where you are in the process.",
        openByDefault: false
      },
      {
        id: 3,
        question: "Do you only print, or do you also handle the design work?",
        answer:
          "Advanc3D is not just a print bureau. The team provides in-house CAD design and modeling in addition to manufacturing. You can submit a finished file or bring patient specs and scans and Advanc3D will engineer the component from there.",
        openByDefault: false
      },
      {
        id: 4,
        question: "What kinds of socket and liner solutions do you offer?",
        answer:
          "Current capabilities include strong 3D sockets, lightweight flexible liners, and Nitro socket systems with adjustability-focused design. Material and configuration options can be discussed when you submit your case.",
        openByDefault: false
      },
      {
        id: 5,
        question: "How quickly can projects move through production?",
        answer:
          "Turnaround depends on case complexity, design requirements, and current production volume. Submit your case or request a quote to discuss timeline expectations.",
        openByDefault: false
      },
      {
        id: 6,
        question: "Can you support clinics that are early in digital adoption?",
        answer:
          "Yes. If your clinic is still building its digital process, Advanc3D can work from the files and information you already have and help bridge the gap to fabricated output.",
        openByDefault: false
      },
      {
        id: 7,
        question: "What happens when I use the contact form?",
        answer:
          "A member of the Advanc3D team will respond directly — typically to discuss a specific patient situation, explore how Advanc3D can support your clinic's needs, or answer questions before you're ready to place an order. To start an order, visit the customer portal at advanc3dinc.com/amfg-customer-portal where you can create an account and submit your first build.",
        openByDefault: false
      }
    ]
  },
  contact: {
    eyebrow: "TALK TO OUR DIGITAL O&P TEAM",
    heading: "Have a Question About a Patient Scenario or How We Can Best Support Your Clinic's Needs?",
    copy:
      "Start a no-obligation conversation with our clinical/digital experts. Whether you are looking for insights on a single case or you wish to integrate our services across your entire clinic, we would be glad to connect with you via email, phone, or Teams/Zoom.",
    primarySubmitLabel: "Send My Question",
    secondarySubmitLabel: "Go to Customer Portal",
    successMessage: "Thanks — we received your request. The Advanc3D team will review it and follow up shortly.",
    errorMessage: "Something went wrong. Please try again or contact us directly."
  },
  footerCta: {
    eyebrow: "READY TO GET STARTED?",
    heading: "Ready to Work With Advanc3D?",
    copy:
      "Have a question or want to talk through a patient situation? Use the contact form above to reach our team directly. Ready to place an order or start a build? Visit the customer portal to create an account and get started.",
    primaryCta: {
      label: "Connect With Our Team",
      href: "#contact-form"
    },
    secondaryCta: {
      label: "Go to Customer Portal",
      href: "https://advanc3dinc.com/amfg-customer-portal/",
      isExternal: true
    }
  },
  contactConfig: {
    fallbackContactEmail: "hello@adv3dinc.com"
  }
};
