"use client";

import Link from "next/link";

// import { useRouter } from "next/router";

export const ContinueToCheckoutCard = () => {
	// const router = useRouter()
	function handleSubmit() {
		// router.push("/checkout/info")
	}
	return (
		<div className="rounded-md shadow-md p-2">
			<div className="flex justify-between">
				<div className="p-2">
					<h1 className="font-semibold">Total</h1>
					<h1 className="font-semibold">Delivery</h1>
					<h1 className="font-semibold">Grand Total</h1>
				</div>
				<div className="p-2 mr-5">
					<h1>Rs. 19,999</h1>
					<h1>Rs. 99</h1>
					<h1>Rs. 20,098</h1>
				</div>
			</div>
			<Link href="/checkout/info">
				<button
					className="px-4 py-2 bg-yellow-400 w-full rounded-md"
					onClick={handleSubmit}
				>
					Continue to Checkout
				</button>
			</Link>
		</div>
	);
};