import Image from "next/image";
import { DeleteCartItemButton } from "./DeleteCartItemButton";

interface Props {
	imgUrl: string;
	name: string;
	price: number;
	quantity: number;
	id : string
}

export const CartItemCard: React.FC<Props> = ({
	imgUrl,
	name,
	price,
	quantity,
	id
}) => {
	return (
		<div className="p-2 shadow-md rounded-md m-4">
			<div className="grid grid-cols-6">
				<div className="col-span-1 rounded-md relative">
					<Image
						src={imgUrl}
						alt="cartimg"
						fill
						style={{ objectFit: "cover" }}
						className="rounded-md"
					/>
				</div>
				<div className="col-span-4 ml-5">
					<h1 className="font-medium text-xl mb-1">{name}</h1>
					<input
						className="p-2 rounded-md w-28 border-2 text-center mb-1"
						placeholder="Quantity"
						type="number"
						value={quantity}
						disabled={true}
					/>
					<h1 className="font-semibold text-2xl mb-1">
						Rs. {price.toLocaleString("en-IN")}
					</h1>
				</div>
				<div className="col-span-1 flex justify-center items-center">
					<DeleteCartItemButton id = {id}/>
				</div>
			</div>
		</div>
	);
};
