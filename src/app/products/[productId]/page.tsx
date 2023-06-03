import Image from "next/image";
import { Review } from "@/components/Review";
import prisma from "@/lib/utils/prisma";
import { ReviewInput } from "@/components/ReviewInput";

export default async function ProductDetail({
	params,
}: {
	params: { productId: string };
}) {
	const product = await prisma.product.findFirst({
		where: {
			id: params.productId,
		},
		include: {
			imageUrls: true,
			reviews: true,
		},
	});

	return (
		<div className="flex flex-col">
			<div className="grid grid-cols-2 mt-10">
				<div className="p-2 col-span-2 md:col-span-1">
					<Image
						src={product?.imageUrls[0]?.url || ""}
						alt="productimg"
						height={1080}
						width={1920}
						style={{ objectFit: "cover" }}
						className="rounded-md"
					/>
				</div>
				<div className="p-2 col-span-2 md:col-span-1">
					<h1 className="mt-5 md:mt-0 font-semibold text-2xl">
						{product?.name}
					</h1>
					<p className="mt-1 font-medium">{product?.description}</p>
					<h2 className="mt-10 font-bold text-4xl">Rs. {product?.price}</h2>
					<div className="flex justify-center">
						<button className="px-5 py-2 bg-yellow-400 rounded mt-10 w-full">
							Add to Cart
						</button>
					</div>
				</div>
			</div>
			<div className="p-2">
				<h1 className="font-semibold text-3xl mb-5">Reviews</h1>
				<ReviewInput />
				<Review username="" reviewText="" />
			</div>
		</div>
	);
}
