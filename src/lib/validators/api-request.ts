import {z} from "zod"

export const addProductValidator = z.object({
	name : z.string(),
	description : z.string(),
	price : z.number()
})

export type AddProductApiRequest = z.infer<typeof addProductValidator>