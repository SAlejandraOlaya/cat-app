import { z } from "zod";

export const breedIdParamSchema = z.object({
  breed_id: z
    .string()
    .min(1, "Breed ID is required")
    .regex(/^[a-z]{4}$/, "Breed ID must be a 4-letter lowercase code"),
});

export const searchQuerySchema = z.object({
  q: z.string().min(1, "Query parameter q is required"),
});

export const breedIdQuerySchema = z.object({
  breed_id: z
    .string()
    .min(1, "Breed ID is required")
    .regex(/^[a-z]{4}$/, "Breed ID must be a 4-letter lowercase code"),
});

export type BreedIdParam = z.infer<typeof breedIdParamSchema>;
export type SearchQuery = z.infer<typeof searchQuerySchema>;
export type BreedIdQuery = z.infer<typeof breedIdQuerySchema>;
