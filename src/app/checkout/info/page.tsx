"use client";
// import { useRouter } from "next/router";
import Link from "next/link";

export default function OrderInfo() {
	// const router = useRouter()
	function handlePayment() {
		// router.push("/checkout/orderplaced")
	}

	return (
		<div className="p-2 flex flex-col items-center">
			<h1 className="font-semibold text-3xl mt-10">Shipping Address</h1>
			<div className="flex flex-col p-4 rounded-md shadow-md w-full md:w-1/2 mt-10">
				<div className="grid grid-cols-7 gap-2">
					<div className="col-span-4">
						<h2>Street Address</h2>
						<input
							placeholder="Address"
							className="px-4 py-2 rounded-sm border-2 outline-none w-full"
						/>
					</div>
					<div className="col-span-3">
						<h2>Apt/Suite</h2>
						<input
							placeholder="Apt/Suite"
							className="px-4 py-2 rounded-sm border-2 outline-none w-full"
						/>
					</div>
				</div>

				<div className="grid grid-cols-5 gap-2 mt-2">
					<div className="col-span-3">
						<h2>City</h2>
						<input
							placeholder="City"
							className="px-4 py-2 rounded-sm border-2 outline-none w-full"
						/>
					</div>
					<div className="col-span-2">
						<h2>Postal Code</h2>
						<input
							placeholder="Pin Code"
							className="px-4 py-2 rounded-sm border-2 outline-none w-full "
						/>
					</div>
				</div>

				<div className="grid grid-cols-2 mt-2 gap-2">
					<div className="col-span-1">
						<h2>State</h2>
						<input
							placeholder="State"
							className="px-4 py-2 rounded-sm border-2 outline-none w-full"
						/>
					</div>

					<div className="col-span-1">
						<h2>Country</h2>
						<input
							placeholder="Country"
							className="px-4 py-2 rounded-sm border-2 outline-none w-full"
						/>
					</div>
				</div>
				<Link href="/checkout/orderplaced">
					<button
						className="px-4 py-2 bg-yellow-400 rounded-md w-full mt-5"
						onClick={handlePayment}
					>
						Continue to Payment
					</button>
				</Link>
			</div>
		</div>
	);
}
