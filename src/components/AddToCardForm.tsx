"use client";

import { AddToCartApiRequest } from "@/lib/validators/api-request";
import axios from "axios";
import toast from "react-hot-toast";

interface Props {
	productId: string;
}

export const AddToCartForm: React.FC<Props> = ({ productId }) => {
	async function handleAddToCart() {
		const payload: AddToCartApiRequest = {
			productId : productId,
			quantityModifier: 1,
		};
		try {
			await axios.post("/api/add-product-to-cart" , payload);
			toast.success("Successfully added product to cart!");
		} catch (e) {
			console.log("error : ", e);
			toast.error("Some error occured!");
		}
	}
	return (
		<button
			className="px-5 py-2 bg-yellow-400 rounded mt-10 w-full"
			onClick={handleAddToCart}
		>
			Add to Cart
		</button>
	);
};
