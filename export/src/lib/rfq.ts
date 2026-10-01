import { z } from "zod";

/** Drawing formats accepted by the RFQ form. */
export const ALLOWED_EXTENSIONS = [
  "pdf", "step", "stp", "igs", "iges", "dwg", "dxf", "x_t", "sldprt",
  "jpg", "jpeg", "png", "webp", "heic", "zip",
] as const;
export const MAX_FILE_BYTES = 25 * 1024 * 1024; // 25 MB per file
export const MAX_FILES = 5;
/** Email providers reject very large messages; above this files are linked, not attached. */
export const MAX_ATTACH_TOTAL_BYTES = 35 * 1024 * 1024;

export const extensionOf = (name: string) => name.toLowerCase().split(".").pop() ?? "";
export const isAllowedFile = (name: string) =>
  (ALLOWED_EXTENSIONS as readonly string[]).includes(extensionOf(name));

export const rfqSchema = z.object({
  name: z.string().trim().min(2).max(120),
  company: z.string().trim().min(1).max(160),
  country: z.string().trim().min(2).max(80),
  email: z.email().max(200),
  phone: z.string().trim().max(40).optional().default(""),
  product: z.string().trim().min(1).max(120),
  grade: z.string().trim().max(120).optional().default(""),
  annualQuantity: z.string().trim().max(120).optional().default(""),
  targetDelivery: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().min(5).max(5000),
  locale: z.string().max(10),
  files: z
    .array(
      z.object({
        pathname: z.string().startsWith("rfq/").max(300),
        name: z.string().max(200),
        size: z.number().int().nonnegative().max(MAX_FILE_BYTES),
      }),
    )
    .max(MAX_FILES)
    .default([]),
  // Spam traps: a hidden field bots fill in, and how long the form was open.
  website: z.string().max(200).optional().default(""),
  elapsedMs: z.number().nonnegative(),
  turnstileToken: z.string().max(4096).optional().default(""),
});

export type RfqInput = z.infer<typeof rfqSchema>;
