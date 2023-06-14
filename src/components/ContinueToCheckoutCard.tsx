"use client";
import axios from "axios";
import { CartItem, ImageUrl } from "@prisma/client";

interface Props {
	cartItems: (CartItem & {
		product: {
			name: string;
			imageUrls: ImageUrl[];
			price: number;
		};
	})[];
}

export const ContinueToCheckoutCard: React.FC<Props> = ({ cartItems }) => {
	async function handleSubmit() {
		try {
			const { data } = await axios.post("/api/checkout-session", {
				cartItems,
			});
			console.log("data : ", data);
			window.location.href = data.paymentLink;
		} catch (err) {
			console.log(err);
		}
	}

	let total = cartItems.reduce((currentTotal, currentValue) => {
		return currentTotal + currentValue.product.price * currentValue.quantity;
	}, 0);
	let delivery = 100;

	return (
		<div className="rounded-md shadow-md p-2">
			<div className="flex justify-between">
				<div className="p-2">
					<h1 className="font-semibold">Total</h1>
					<h1 className="font-semibold">Delivery</h1>
					<h1 className="font-semibold">Grand Total</h1>
				</div>
				<div className="p-2 mr-5">
					<h1>Rs. {total.toLocaleString("en-IN")}</h1>
					<h1>Rs. {delivery.toLocaleString("en-IN")}</h1>
					<h1>Rs. {(total + delivery).toLocaleString("en-IN")}</h1>
				</div>
			</div>
			<button
				className="px-4 py-2 bg-yellow-400 w-full rounded-md"
				onClick={handleSubmit}
			>
				Continue to Checkout
			</button>
		</div>
	);
};
