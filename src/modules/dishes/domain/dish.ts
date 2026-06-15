import { z } from "zod";

export const dishCategorySchema = z.enum([
  "entrada",
  "principal",
  "postre",
  "bebida",
]);
export type DishCategory = z.infer<typeof dishCategorySchema>;

export const dishSchema = z.object({
  id: z.string(),
  name: z.string().min(2).max(80),
  description: z.string().min(2).max(500),
  price: z.number().nonnegative(),
  category: dishCategorySchema,
  imageUrl: z.string().url().optional().or(z.literal("")),
  available: z.boolean().default(true),
  featured: z.boolean().default(false),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
export type Dish = z.infer<typeof dishSchema>;

export const dishDraftSchema = dishSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type DishDraft = z.infer<typeof dishDraftSchema>;

export const dishUpdateSchema = dishDraftSchema.partial();
export type DishUpdate = z.infer<typeof dishUpdateSchema>;
