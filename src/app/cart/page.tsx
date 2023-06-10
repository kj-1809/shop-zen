import { CartItemCard } from "@/components/CartItemCard";
import { ContinueToCheckoutCard } from "@/components/ContinueToCheckoutCard";
import prisma from "@/lib/utils/prisma";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
export default async function Cart() {
	const { userId } = auth();

	if (!userId) {
		return (
			<Link href="/signin">
				<div>Please login</div>
			</Link>
		);
	}

	const cartItems = await prisma.cartItem.findMany({
		where: {
			userId: userId,
		},
		include: {
			product: {
				select: {
					imageUrls: true,
					name: true,
					price: true,
				},
			},
		},
	});

	return (
		<div className="p-2 grid grid-cols-1 md:grid-cols-5">
			<div className="col-span-3">
				<h1 className="font-semibold text-4xl mt-5 ml-5">Cart</h1>
				{cartItems.map((cartItem) => (
					<CartItemCard
						imgUrl={cartItem.product.imageUrls[0]?.url || ""}
						key={cartItem.id}
						name={cartItem.product.name}
						price={cartItem.product.price}
						quantity={cartItem.quantity}
					/>
				))}
			</div>
			<div className="col-span-2">
				<ContinueToCheckoutCard cartItems = {cartItems}/>
			</div>
		</div>
	);
}
