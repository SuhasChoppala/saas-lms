import * as z from "zod";

export const groupFormSchema = z.object({
  name: z.string().trim().min(1).max(80),
  slug: z
    .string()
    .trim()
    .min(1)
    .toLowerCase()
    .regex(/^[a-z0-9-]+$/),
  description: z.string().trim().max(2000).optional(),
});

export type GroupFormInput = z.infer<typeof groupFormSchema>;
