import { z } from "zod";
import { CartItem } from "@prisma/client";

export const addProductValidator = z.object({
  name: z.string().min(5).max(150),
  description: z.string().min(5),
  price: z.number().gte(1).multipleOf(1),
  imageUrls: z.array(z.object({ url: z.string() })),
});

export const addReviewValidator = z.object({
  reviewText: z.string().min(3),
  productId: z.string(),
});

export const addToCartValidator = z.object({
  productId: z.string(),
  quantityModifier: z.number(),
});

export const deleteCartItemValidator = z.object({
  id: z.string(),
});
export const deleteUserValidator = z.object({
  userId: z.string(),
});

export const updateUserValidator = z.object({
  userId: z.string(),
  name: z.string(),
  role: z.string(),
});

export const updateProductValidator = z.object({
  productId: z.string(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
  imageUrls: z.array(z.object({ url: z.string() })),
});

export const checkoutSessionValidator = z.object({});

export type AddProductApiRequest = z.infer<typeof addProductValidator>;
export type AddReviewApiRequest = z.infer<typeof addReviewValidator>;
export type AddToCartApiRequest = z.infer<typeof addToCartValidator>;
export type CheckoutSessionApiRequest = z.infer<
  typeof checkoutSessionValidator
>;
export type DeleteCartItemApiRequest = z.infer<typeof deleteCartItemValidator>;
export type DeleteUserApiRequest = z.infer<typeof deleteUserValidator>;
export type UpdateUserApiRequest = z.infer<typeof updateUserValidator>;
export type UpdateProductApiRequest = z.infer<typeof updateProductValidator>;
