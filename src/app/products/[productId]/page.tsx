import Image from "next/image";
import { Review } from "@/components/Review";

export default function ProductDetail() {
	return (
		<div className="flex flex-col">
			<div className="flex flex-col md:flex-row">
				<div className="p-2">
					<Image
						src="https://uploadthing.com/f/02c4ee2e-618c-4223-9668-5f40b8f6a8b5_pexels-thorsten-technoman-338504.jpg"
						alt="productimg"
						height={1080}
						width={1920}
						style={{ objectFit: "cover" }}
						className="rounded-md"
					/>
				</div>
				<div className="p-2">
					<h1 className="mt-5 font-semibold text-2xl">Macbook pro 14 inch</h1>
					<p className="mt-1 font-medium">
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore
						aliquam tenetur ex ad aspernatur, in, modi ipsum quas aliquid
						doloribus voluptates, quidem labore blanditiis illo.
					</p>
					<h2 className="mt-10 font-bold text-4xl">Rs. 19,999</h2>
					<div className="flex justify-center">
						<button className="px-5 py-2 bg-yellow-400 rounded mt-10 w-full">
							Add to Cart
						</button>
					</div>
				</div>
			</div>
			<div className = "p-2">
				<h1 className="font-semibold text-3xl mb-5">Reviews</h1>
				<Review />
			</div>
		</div>
	);
}
