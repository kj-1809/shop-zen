"use client";
import axios from "axios";
import { useState } from "react";
export default function AddProduct() {
	function handleSubmit() {
		// axios.post()
	}

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);

	return (
		<div className="p-2">
			<h1 className="text-3xl font-semibold mt-10 text-center">Add Product</h1>
			<div className="flex flex-col items-center">
				<div className="w-full md:w-1/2">
					<div className="mt-10">
						<h1>Name</h1>
						<input
							placeholder="name"
							className="px-4 py-2 rounded-sm border-2 outline-none w-full"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="mt-2">
						<h1>Description</h1>
						<textarea
							placeholder="description"
							className="px-4 py-2 rounded-sm border-2 outline-none w-full h-48"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
					<div className="mt-2">
						<h1>Price</h1>
						<input
							placeholder="price"
							className="px-4 py-2 rounded-sm border-2 outline-none w-full"
							type="number"
							value={price}
							onChange={(e) => setPrice(parseInt(e.target.value))}
						/>
					</div>
					<button
						className="rounded-md px-4 py-2 bg-yellow-400 w-full mt-5"
						onClick={handleSubmit}
					>
						Add product
					</button>
				</div>
			</div>
		</div>
	);
}
