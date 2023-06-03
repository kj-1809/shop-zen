import { z } from "zod";

export const addProductValidator = z.object({
	name: z.string(),
	description: z.string(),
	price: z.number(),
	imageUrls: z.array(z.object({ url: z.string() })),
});

export type AddProductApiRequest = z.infer<typeof addProductValidator>;
