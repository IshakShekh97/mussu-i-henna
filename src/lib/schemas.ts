import { z } from "zod";

export const bookingFormSchema = z.object({
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name is too long"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name is too long"),
  phone: z
    .string()
    .min(10, "Please enter a valid contact/WhatsApp phone number")
    .max(15, "Phone number is too long"),
  ceremonies: z
    .array(z.string())
    .min(1, "Please select at least one ceremony to request a quotation"),
  customCeremony: z.string().max(200).optional(),
  city: z.string().min(2, "City is required").max(60, "City name is too long"),
  location: z
    .string()
    .min(3, "Venue location / address is required")
    .max(150, "Location is too long"),
  ceremonyDate: z.string().min(1, "Please select your ceremony date"),
  preferences: z.array(z.string()).optional(),
  requirements: z
    .string()
    .max(600, "Requirements cannot exceed 600 characters")
    .optional(),
});

export type BookingFormValues = z.infer<typeof bookingFormSchema>;

export const trackOrderSchema = z.object({
  query: z
    .string()
    .min(3, "Please enter a valid Order ID (e.g. MH-2026-01) or phone number")
    .max(30, "Query is too long"),
});

export type TrackOrderValues = z.infer<typeof trackOrderSchema>;

export const checkoutSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(70, "Full name is too long"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .max(15, "Phone number is too long"),
  address: z
    .string()
    .min(6, "Please provide complete delivery street address")
    .max(200, "Address is too long"),
  city: z
    .string()
    .min(2, "Please specify city")
    .max(50, "City name is too long"),
  postalCode: z
    .string()
    .min(6, "Postal code must be 6 digits")
    .max(6, "Postal code must be 6 digits"),
  notes: z.string().max(300, "Special instructions too long").optional(),
});

export type CheckoutValues = z.infer<typeof checkoutSchema>;

export const registrationSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(70, "Full name is too long"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Please enter a valid WhatsApp contact number")
    .max(15, "Phone number is too long"),
  city: z.string().min(2, "City is required"),
  program: z.string().min(1, "Please select a masterclass program"),
  cohort: z.string().min(1, "Please select a cohort batch"),
  experienceLevel: z.enum(["beginner", "intermediate", "professional"], {
    message: "Please choose your experience level",
  }),
  includeKit: z.boolean(),
  notes: z.string().max(400, "Notes cannot exceed 400 characters").optional(),
});

export type RegistrationValues = z.infer<typeof registrationSchema>;
