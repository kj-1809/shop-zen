import { z } from "zod";

export const addProductValidator = z.object({
	name: z.string(),
	description: z.string(),
	price: z.number(),
	imageUrls: z.array(z.object({ url: z.string() })),
});

export const addReviewValidator = z.object({
	reviewText : z.string().min(3),
	productId : z.string()
})

export const addToCartValidator = z.object({
	productId : z.string(),
	quantityModifier : z.number()
})

export type AddProductApiRequest = z.infer<typeof addProductValidator>;
export type AddReviewApiRequest = z.infer<typeof addReviewValidator>;
export type AddToCartApiRequest = z.infer<typeof addToCartValidator>;