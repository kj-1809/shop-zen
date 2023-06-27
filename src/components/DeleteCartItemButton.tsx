"use client";
import { RiDeleteBin5Line } from "react-icons/ri";
import axios from "axios";
import { DeleteCartItemApiRequest } from "@/lib/validators/api-request";

interface Props {
	id: string;
}

export const DeleteCartItemButton: React.FC<Props> = ({ id }) => {
	async function handleDelete() {
		console.log("delete triggered !");
		const payload: DeleteCartItemApiRequest = {
			id: id,
		};
		try {
			const data = await axios.post("/api/delete-cart-item", payload);
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<button onClick={handleDelete}>
			<RiDeleteBin5Line className="cursor-pointer text-red-400 text-2xl" />
		</button>
	);
};
