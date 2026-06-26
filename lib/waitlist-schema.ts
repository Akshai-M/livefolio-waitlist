import { z } from "zod";

export const waitlistEmailSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Enter your email address.")
    .email("Enter a valid email address."),
});

export function getWaitlistEmailError(email: string): string | null {
  const result = waitlistEmailSchema.safeParse({ email });
  if (result.success) return null;
  return result.error.issues[0]?.message ?? "Enter a valid email address.";
}
