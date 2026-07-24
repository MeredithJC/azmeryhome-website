import { z } from "zod";
import type { LeadType } from "@/lib/site";

/**
 * Shared zod schemas for every lead form (spec §18.4). These run on BOTH the
 * client (react-hook-form) and the server (api/lead route) so validation can't
 * be bypassed. Keep field names in sync with the field configs in ./configs.
 */

const name = z.string().trim().min(2, "Please enter your name").max(120);
const email = z.string().trim().email("Enter a valid email address").max(160);
const phoneOptional = z
  .string()
  .trim()
  .max(40)
  .optional()
  .or(z.literal(""));
const phoneRequired = z
  .string()
  .trim()
  .min(7, "Enter a valid phone number")
  .max(40);
const consent = z.literal(true, {
  message: "Please confirm you consent to be contacted",
});
const optionalText = (max = 2000) =>
  z.string().trim().max(max).optional().or(z.literal(""));

/** Fields injected by the client (not user-entered) — spec §18.4. */
export const metaSchema = z.object({
  pageUrl: z.string().max(500).optional(),
  propertyRef: z.string().max(200).optional(),
  utm: z.record(z.string(), z.string()).optional(),
  // Honeypot value carried through for the server to inspect (checked raw in
  // the route, not via a strict schema, so a filled value doesn't fail parsing).
  company_website: z.string().max(200).optional(),
});

export const sellerSchema = z.object({
  name,
  email,
  phone: phoneRequired,
  propertyAddress: z.string().trim().min(5, "Enter the property address").max(200),
  propertyType: z.string().min(1, "Select a property type"),
  beds: optionalText(10),
  baths: optionalText(10),
  occupancy: z.string().min(1, "Select the occupancy"),
  condition: z.string().min(1, "Select the property condition"),
  timeframe: z.string().min(1, "Select a timeframe"),
  askingPrice: optionalText(60),
  photosLink: optionalText(300),
  message: optionalText(),
  consent,
});

export const buyerSchema = z.object({
  name,
  email,
  phone: phoneRequired,
  propertyOfInterest: optionalText(200),
  desiredArea: optionalText(160),
  budget: optionalText(60),
  bedsDesired: optionalText(10),
  workingWithAgent: z.string().min(1, "Please choose Yes or No"),
  message: optionalText(),
  consent,
});

export const buyerListSchema = z.object({
  name,
  email,
  phone: phoneOptional,
  preferredAreas: optionalText(200),
  budget: optionalText(60),
  bedsDesired: optionalText(10),
  workingWithAgent: z.string().min(1, "Please choose Yes or No"),
  consent,
});

export const dealSchema = z.object({
  name,
  company: optionalText(160),
  email,
  phone: phoneRequired,
  propertyAddress: z.string().trim().min(5, "Enter the property address").max(200),
  askingPrice: optionalText(60),
  arv: optionalText(60),
  repairEstimate: optionalText(60),
  occupancy: optionalText(60),
  dealNotes: optionalText(),
  link: optionalText(300),
  heardAbout: optionalText(160),
  consent,
});

export const capitalSchema = z.object({
  name,
  email,
  phone: phoneOptional,
  entity: optionalText(160),
  interest: optionalText(160),
  message: z.string().trim().min(10, "Tell us a little about your interest").max(2000),
  consent,
});

export const vendorSchema = z.object({
  name,
  company: optionalText(160),
  email,
  phone: phoneRequired,
  trade: z.string().trim().min(2, "Enter your trade or service").max(120),
  coverageArea: optionalText(160),
  yearsInBusiness: optionalText(20),
  insuranceLicensing: optionalText(200),
  link: optionalText(300),
  references: optionalText(),
  message: optionalText(),
  consent,
});

export const contactSchema = z.object({
  name,
  email,
  phone: phoneOptional,
  reason: z.string().min(1, "Select a reason"),
  message: z.string().trim().min(5, "Please enter a message").max(2000),
  consent,
});

/** Registry keyed by lead type — used by the server route to pick a validator. */
export const leadSchemas: Record<LeadType, z.ZodTypeAny> = {
  seller: sellerSchema,
  buyer: buyerSchema,
  "buyer-list": buyerListSchema,
  deal: dealSchema,
  capital: capitalSchema,
  vendor: vendorSchema,
  contact: contactSchema,
};

export type SellerForm = z.infer<typeof sellerSchema>;
export type BuyerForm = z.infer<typeof buyerSchema>;
export type BuyerListForm = z.infer<typeof buyerListSchema>;
export type DealForm = z.infer<typeof dealSchema>;
export type CapitalForm = z.infer<typeof capitalSchema>;
export type VendorForm = z.infer<typeof vendorSchema>;
export type ContactForm = z.infer<typeof contactSchema>;
