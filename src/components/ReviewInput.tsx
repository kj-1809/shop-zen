"use client";

import { useState } from "react";
import axios from "axios";
import { AddReviewApiRequest } from "@/lib/validators/api-request";
import toast from "react-hot-toast";

interface Props{
	productId : string
}

export const ReviewInput: React.FC<Props> = ({productId}) => {
	const [reviewText, setReviewText] = useState("");

	async function handleReviewSubmit() {
		const payload: AddReviewApiRequest = {
			reviewText,
			productId
		};
		try {
			const res = await axios.post("/api/addreview", payload);
      toast.success("Review added successfully !")
		} catch (e) {
			toast.error("Some error occured !");
		}
	}

	return (
		<div className="w-full mt-5">
			<textarea
				className="outline-none rounded-sm border-2 border-gray-300 w-full px-4 py-2"
				placeholder="Write a review ..."
				value={reviewText}
				onChange={(e) => setReviewText(e.target.value)}
			/>
			<button
				className="px-4 py-2 rounded-md bg-yellow-400"
				onClick={handleReviewSubmit}
			>
				Post Review
			</button>
		</div>
	);
};
