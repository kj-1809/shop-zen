import Image from "next/image";
import { RiDeleteBin5Line } from "react-icons/ri";
export const CartItemCard = () => {
	return (
		<div className="p-2 shadow-md rounded-md m-4">
			<div className="grid grid-cols-6">
				<div className="col-span-1 rounded-md relative">
					<Image
						src="https://uploadthing.com/f/02c4ee2e-618c-4223-9668-5f40b8f6a8b5_pexels-thorsten-technoman-338504.jpg"
						alt="cartimg"
						fill
						style={{ objectFit: "cover" }}
						className="rounded-md"
					/>
				</div>
				<div className="col-span-4 ml-5">
					<h1 className="font-medium text-xl mb-1">Macbook pro 14 inch</h1>
					<input
						className="p-2 rounded-md w-28 border-2 text-center mb-1"
						placeholder="Quantity"
						type="number"
					/>
					<h1 className="font-semibold text-2xl mb-1">Rs. 19,999</h1>
				</div>
				<div className="col-span-1 flex justify-center items-center">
					<RiDeleteBin5Line className="cursor-pointer text-red-400 text-2xl" />
				</div>
			</div>
		</div>
	);
};
