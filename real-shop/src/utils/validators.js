import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().nonnegative("Price must be >= 0"),
  discount: z.number().nonnegative().optional(),
  sku: z.string().min(1, "SKU is required"),
  brand: z.string().optional(),
  category: z.string().optional(),
  images: z.array(z.string()).optional(),
  availability: z.enum(["in_stock", "out_of_stock", "preorder"]).optional(),
  weight: z.number().optional(),
  tags: z.array(z.string()).optional(),
  isActive: z.boolean().optional(),
});
