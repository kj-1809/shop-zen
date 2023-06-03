import { ProductCard } from "@/components/ProductCard";
import prisma from "@/lib/utils/prisma";
export default async function ProductSearch({
	searchParams,
}: {
	searchParams: { q: string | undefined };
}) {
	const products = await prisma.product.findMany({
		where: {
			name: {
				contains: searchParams.q,
			},
		},
		include: {
			imageUrls: true,
		},
	});
	return (
		<div className="grid grid-cols-1 md:grid-cols-3">
			{products.map((product) => (
				<ProductCard
					key={product.id}
					name={product.name}
					id = {product.id}
					price={product.price}
					imgUrl={product.imageUrls[0]?.url || ""}
				/>
			))}
		</div>
	);
}
