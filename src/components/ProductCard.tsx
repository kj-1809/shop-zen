import Image from "next/image";
import Link from "next/link";

interface Props {
	name: string;
	price: number;
	imgUrl: string;
	id : string
}

export const ProductCard: React.FC<Props> = ({
	name,
	price,
	imgUrl,
	id
}) => {
	return (
		<Link href={`/products/${id}`}>
			<div className="m-2 p-4 shadow-md rounded-md">
				<div className="relative h-96">
					<Image
						src={imgUrl}
						alt="productimg"
						fill
						style={{ objectFit: "cover" }}
					/>
				</div>
				<h1 className="font-medium text-lg mt-3">{name}</h1>
				<h1 className="font-semibold text-xl">Rs. {price}</h1>
			</div>
		</Link>
	);
};
