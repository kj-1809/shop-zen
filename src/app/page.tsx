import { ProductCard } from "@/components/ProductCard";
import { Carousel } from "@/components/Carousel";
import Image from "next/image";

export default function Home() {
	return (
		<main className="">
			<Carousel />
			<h1 className="mt-10 text-4xl font-semibold text-center">Trending</h1>
			<div className="grid grid-cols-1 md:grid-cols-3 mt-4">
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
			</div>
		</main>
	);
}
