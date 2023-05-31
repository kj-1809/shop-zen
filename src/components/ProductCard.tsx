import Image from "next/image";
import Link from "next/link";
export const ProductCard = () => {
	return (
		<Link href="/products/someid">
			<div className="m-2 p-4 shadow-md rounded-md">
				<div className="relative h-96">
					<Image
						src="https://uploadthing.com/f/02c4ee2e-618c-4223-9668-5f40b8f6a8b5_pexels-thorsten-technoman-338504.jpg"
						alt="productimg"
						fill
						style={{ objectFit: "cover" }}
						className = "rounded-md"
					/>
				</div>
				<h1 className="font-medium text-lg mt-3">Macbook pro 14 inch</h1>
				<h1 className="font-semibold text-xl">Rs. 19,999</h1>
			</div>
		</Link>
	);
};
