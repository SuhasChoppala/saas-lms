import * as z from "zod";

export const groupFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(80, "Name can be at most 80 characters."),
  slug: z
    .string()
    .trim()
    .min(1, "Slug must be at least 1 character")
    .toLowerCase()
    .regex(/^[a-z0-9-]+$/, "Slug can only use lowercase letters, numbers and hyphens."),
  description: z
    .string()
    .trim()
    .max(2000, "Description should have a max of 2000 characters.")
    .optional(),
});

export type GroupFormInput = z.infer<typeof groupFormSchema>;
