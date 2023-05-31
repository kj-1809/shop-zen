import { CartItemCard } from "@/components/CartItemCard";
import { ContinueToCheckoutCard } from "@/components/ContinueToCheckoutCard";
export default function Cart() {
	return (
		<div className="p-2 grid grid-cols-1 md:grid-cols-5">
			<div className="col-span-3">
				<h1 className="font-semibold text-4xl mt-5 ml-5">Cart</h1>
				<CartItemCard />
				<CartItemCard />
				<CartItemCard />
				<CartItemCard />
			</div>
			<div className="col-span-2">
				<ContinueToCheckoutCard />
			</div>
		</div>
	);
}
