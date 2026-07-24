import type { LeadType } from "@/lib/site";
import { leadSchemas } from "./schemas";
import type { z } from "zod";

export type FieldType =
  | "text"
  | "email"
  | "tel"
  | "textarea"
  | "select"
  | "radio"
  | "checkbox";

export interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
  autoComplete?: string;
  help?: string;
  /** Layout: render at half width on larger screens. */
  half?: boolean;
}

export interface FormConfig {
  leadType: LeadType;
  submitLabel: string;
  schema: z.ZodTypeAny;
  fields: FieldDef[];
}

const yesNo = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

const consentField: FieldDef = {
  name: "consent",
  label:
    "I consent to be contacted by AZMERYHOME about my inquiry. I understand this is not a marketing subscription.",
  type: "checkbox",
  required: true,
};

// --- Seller (spec §7) -------------------------------------------------------
const seller: FormConfig = {
  leadType: "seller",
  submitLabel: "Submit Property",
  schema: leadSchemas.seller,
  fields: [
    { name: "name", label: "Your name", type: "text", required: true, half: true, autoComplete: "name" },
    { name: "email", label: "Email", type: "email", required: true, half: true, autoComplete: "email" },
    { name: "phone", label: "Phone", type: "tel", required: true, half: true, autoComplete: "tel" },
    { name: "propertyAddress", label: "Property address", type: "text", required: true, half: true, autoComplete: "street-address" },
    {
      name: "propertyType",
      label: "Property type",
      type: "select",
      required: true,
      half: true,
      options: [
        { value: "single-family", label: "Single-family home" },
        { value: "multi-family", label: "Multi-family" },
        { value: "townhome-condo", label: "Townhome / Condo" },
        { value: "land", label: "Land / Lot" },
        { value: "other", label: "Other" },
      ],
    },
    {
      name: "occupancy",
      label: "Current occupancy",
      type: "select",
      required: true,
      half: true,
      options: [
        { value: "owner-occupied", label: "Owner-occupied" },
        { value: "tenant-occupied", label: "Tenant-occupied" },
        { value: "vacant", label: "Vacant" },
        { value: "other", label: "Other" },
      ],
    },
    { name: "beds", label: "Bedrooms (if known)", type: "text", half: true },
    { name: "baths", label: "Bathrooms (if known)", type: "text", half: true },
    {
      name: "condition",
      label: "Property condition",
      type: "select",
      required: true,
      half: true,
      options: [
        { value: "excellent", label: "Excellent" },
        { value: "good", label: "Good" },
        { value: "needs-updates", label: "Needs updates" },
        { value: "major-repairs", label: "Major repairs" },
        { value: "unsure", label: "Unsure" },
      ],
    },
    {
      name: "timeframe",
      label: "Desired selling timeframe",
      type: "select",
      required: true,
      half: true,
      options: [
        { value: "asap", label: "As soon as possible" },
        { value: "1-3-months", label: "1–3 months" },
        { value: "3-6-months", label: "3–6 months" },
        { value: "6-plus-months", label: "6+ months" },
        { value: "just-exploring", label: "Just exploring" },
      ],
    },
    { name: "askingPrice", label: "Asking price or expectation (optional)", type: "text", half: true },
    {
      name: "photosLink",
      label: "Link to photos (optional)",
      type: "text",
      half: true,
      help: "Paste a link to photos (e.g. Google Drive or Dropbox). Helpful but not required.",
    },
    { name: "message", label: "Anything else we should know? (optional)", type: "textarea" },
    consentField,
  ],
};

// --- Buyer interest (spec §6.3) --------------------------------------------
const buyer: FormConfig = {
  leadType: "buyer",
  submitLabel: "Send Inquiry",
  schema: leadSchemas.buyer,
  fields: [
    { name: "name", label: "Your name", type: "text", required: true, half: true, autoComplete: "name" },
    { name: "email", label: "Email", type: "email", required: true, half: true, autoComplete: "email" },
    { name: "phone", label: "Phone", type: "tel", required: true, half: true, autoComplete: "tel" },
    { name: "propertyOfInterest", label: "Property of interest", type: "text", half: true },
    { name: "desiredArea", label: "Desired area", type: "text", half: true },
    { name: "budget", label: "Approximate budget range", type: "text", half: true },
    { name: "bedsDesired", label: "Bedrooms desired", type: "text", half: true },
    {
      name: "workingWithAgent",
      label: "Are you currently working with a real estate agent?",
      type: "radio",
      required: true,
      options: yesNo,
    },
    { name: "message", label: "Message (optional)", type: "textarea" },
    consentField,
  ],
};

// --- Buyer list / property alerts (spec §13) --------------------------------
const buyerList: FormConfig = {
  leadType: "buyer-list",
  submitLabel: "Join Buyer List",
  schema: leadSchemas["buyer-list"],
  fields: [
    { name: "name", label: "Your name", type: "text", required: true, half: true, autoComplete: "name" },
    { name: "email", label: "Email", type: "email", required: true, half: true, autoComplete: "email" },
    { name: "phone", label: "Phone (optional)", type: "tel", half: true, autoComplete: "tel" },
    { name: "preferredAreas", label: "Preferred Houston areas", type: "text", half: true },
    { name: "budget", label: "Price range", type: "text", half: true },
    { name: "bedsDesired", label: "Bedrooms", type: "text", half: true },
    {
      name: "workingWithAgent",
      label: "Are you working with a real estate agent?",
      type: "radio",
      required: true,
      options: yesNo,
    },
    consentField,
  ],
};

// --- Deal submission: Agents & Wholesalers (spec §11) -----------------------
const deal: FormConfig = {
  leadType: "deal",
  submitLabel: "Submit Deal",
  schema: leadSchemas.deal,
  fields: [
    { name: "name", label: "Your name", type: "text", required: true, half: true, autoComplete: "name" },
    { name: "company", label: "Company (optional)", type: "text", half: true, autoComplete: "organization" },
    { name: "email", label: "Email", type: "email", required: true, half: true, autoComplete: "email" },
    { name: "phone", label: "Phone", type: "tel", required: true, half: true, autoComplete: "tel" },
    { name: "propertyAddress", label: "Property address", type: "text", required: true, autoComplete: "street-address" },
    { name: "askingPrice", label: "Asking price", type: "text", half: true },
    { name: "arv", label: "ARV estimate (if known)", type: "text", half: true },
    { name: "repairEstimate", label: "Repair estimate (if known)", type: "text", half: true },
    { name: "occupancy", label: "Occupancy", type: "text", half: true },
    { name: "dealNotes", label: "Deal notes", type: "textarea" },
    { name: "link", label: "Link / uploads (optional)", type: "text", help: "Paste a link to photos or a deal sheet." },
    { name: "heardAbout", label: "How did you hear about AZMERYHOME? (optional)", type: "text" },
    consentField,
  ],
};

// --- Capital / private lenders (spec §11) -----------------------------------
const capital: FormConfig = {
  leadType: "capital",
  submitLabel: "Start a Conversation",
  schema: leadSchemas.capital,
  fields: [
    { name: "name", label: "Your name", type: "text", required: true, half: true, autoComplete: "name" },
    { name: "email", label: "Email", type: "email", required: true, half: true, autoComplete: "email" },
    { name: "phone", label: "Phone (optional)", type: "tel", half: true, autoComplete: "tel" },
    { name: "entity", label: "Company / entity (optional)", type: "text", half: true, autoComplete: "organization" },
    { name: "interest", label: "Area of interest (optional)", type: "text" },
    { name: "message", label: "Tell us a little about what you're exploring", type: "textarea", required: true },
    consentField,
  ],
};

// --- Contractors & Vendors (spec §11) ---------------------------------------
const vendor: FormConfig = {
  leadType: "vendor",
  submitLabel: "Become a Partner",
  schema: leadSchemas.vendor,
  fields: [
    { name: "name", label: "Your name", type: "text", required: true, half: true, autoComplete: "name" },
    { name: "company", label: "Company (optional)", type: "text", half: true, autoComplete: "organization" },
    { name: "email", label: "Email", type: "email", required: true, half: true, autoComplete: "email" },
    { name: "phone", label: "Phone", type: "tel", required: true, half: true, autoComplete: "tel" },
    { name: "trade", label: "Trade / service", type: "text", required: true, half: true },
    { name: "coverageArea", label: "Coverage area", type: "text", half: true },
    { name: "yearsInBusiness", label: "Years in business", type: "text", half: true },
    { name: "insuranceLicensing", label: "Insurance / licensing (if applicable)", type: "text", half: true },
    { name: "link", label: "Website or social link (optional)", type: "text", half: true },
    { name: "references", label: "References (optional)", type: "textarea" },
    { name: "message", label: "Message (optional)", type: "textarea" },
    consentField,
  ],
};

// --- General contact (spec §12) ---------------------------------------------
const contact: FormConfig = {
  leadType: "contact",
  submitLabel: "Send Message",
  schema: leadSchemas.contact,
  fields: [
    { name: "name", label: "Your name", type: "text", required: true, half: true, autoComplete: "name" },
    { name: "email", label: "Email", type: "email", required: true, half: true, autoComplete: "email" },
    { name: "phone", label: "Phone (optional)", type: "tel", half: true, autoComplete: "tel" },
    {
      name: "reason",
      label: "Reason for contacting us",
      type: "select",
      required: true,
      half: true,
      options: [
        { value: "sell", label: "Selling a property" },
        { value: "buy", label: "Buying a home" },
        { value: "deal", label: "Submitting a deal" },
        { value: "capital", label: "Capital / lending" },
        { value: "partner", label: "Vendor / partner" },
        { value: "other", label: "Something else" },
      ],
    },
    { name: "message", label: "Message", type: "textarea", required: true },
    consentField,
  ],
};

export const formConfigs: Record<LeadType, FormConfig> = {
  seller,
  buyer,
  "buyer-list": buyerList,
  deal,
  capital,
  vendor,
  contact,
};

/** Per-lead-type metadata: email subject lines (spec §18.4) + thank-you copy. */
export const leadMeta: Record<
  LeadType,
  { label: string; subject: string; thankYouTitle: string; thankYouBody: string }
> = {
  seller: {
    label: "Seller Lead",
    subject: "New Seller Lead",
    thankYouTitle: "Thanks — we've received your property details.",
    thankYouBody:
      "Our team will review the opportunity and reach out to discuss next steps. There's no obligation, and we evaluate every property individually.",
  },
  buyer: {
    label: "Buyer Inquiry",
    subject: "New Buyer Inquiry",
    thankYouTitle: "Thanks for your interest — we'll be in touch.",
    thankYouBody:
      "We've received your inquiry and will follow up with more information about the property and next steps.",
  },
  "buyer-list": {
    label: "Buyer List Signup",
    subject: "New Buyer List Signup",
    thankYouTitle: "You're on the list.",
    thankYouBody:
      "We'll let you know when new AZMERYHOME homes matching your preferences become available.",
  },
  deal: {
    label: "Deal Submission",
    subject: "New Deal Submission",
    thankYouTitle: "Deal received — thank you.",
    thankYouBody:
      "We'll review the opportunity and get back to you. We appreciate you thinking of AZMERYHOME.",
  },
  capital: {
    label: "Capital Inquiry",
    subject: "New Capital / Lending Inquiry",
    thankYouTitle: "Thanks for reaching out.",
    thankYouBody:
      "We'll follow up to start a conversation about how we work. This is an informational introduction — not an offer or solicitation.",
  },
  vendor: {
    label: "Vendor / Partner Inquiry",
    subject: "New Vendor / Partner Inquiry",
    thankYouTitle: "Thanks for your interest in partnering.",
    thankYouBody:
      "We'll review your information and reach out if there's a fit for current or upcoming projects.",
  },
  contact: {
    label: "Contact Message",
    subject: "New Contact Message",
    thankYouTitle: "Message sent — thank you.",
    thankYouBody: "We've received your message and will get back to you soon.",
  },
};
