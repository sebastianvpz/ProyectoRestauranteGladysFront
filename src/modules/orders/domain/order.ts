import { z } from "zod";

export const orderStatusSchema = z.enum([
  "pending",
  "confirmed",
  "preparing",
  "ready",
  "delivered",
  "cancelled",
]);
export type OrderStatus = z.infer<typeof orderStatusSchema>;

export const orderItemSchema = z.object({
  dishId: z.string(),
  name: z.string(),
  quantity: z.number().int().positive(),
  unitPrice: z.number().nonnegative(),
  notes: z.string().optional(),
});
export type OrderItem = z.infer<typeof orderItemSchema>;

export const orderSchema = z.object({
  id: z.string(),
  code: z.string(),
  customerName: z.string().min(2),
  customerPhone: z.string().min(7),
  customerAddress: z.string().optional(),
  items: z.array(orderItemSchema).min(1),
  total: z.number().nonnegative(),
  status: orderStatusSchema,
  isPaid: z.boolean(),
  source: z.enum(["whatsapp", "web", "phone"]).default("whatsapp"),
  notes: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Order = z.infer<typeof orderSchema>;

export const orderDraftSchema = orderSchema.omit({
  id: true,
  code: true,
  total: true,
  status: true,
  createdAt: true,
  updatedAt: true,
});
export type OrderDraft = z.infer<typeof orderDraftSchema>;
