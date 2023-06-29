"use client";

import { RiDeleteBin5Line } from "react-icons/ri";
import axios from "axios";
import { DeleteCartItemApiRequest } from "@/lib/validators/api-request";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

interface Props {
	id: string;
}

export const DeleteCartItemButton: React.FC<Props> = ({ id }) => {
	const router = useRouter();

	const { mutate: handleDelete, isLoading } = useMutation({
		mutationFn: async () => {
			const payload: DeleteCartItemApiRequest = {
				id: id,
			};
			await axios.post("/api/delete-cart-item", payload);
		},
		onSuccess: () => {
			startTransition(() => {
				router.refresh();
			});
		},
		onError: () => {
			toast.error("Some error occured while deleting cart item");
		},
	});

	return (
		<button
			onClick={() => {
				handleDelete();
			}}
		>
			{isLoading ? (
				<AiOutlineLoading className="text-2xl animate-spin" />
			) : (
				<RiDeleteBin5Line className="cursor-pointer text-red-400 text-2xl" />
			)}
		</button>
	);
};
