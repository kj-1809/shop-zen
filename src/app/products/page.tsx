import { ProductCard } from "@/components/ProductCard";
export default function ProductSearch({
	searchParams,
}: {
	searchParams: { q: string | undefined };
}) {
	return (
		<div className= "grid grid-cols-1 md:grid-cols-3">
			<ProductCard />
			<ProductCard />
			<ProductCard />
			<ProductCard />
		</div>
	);
}
