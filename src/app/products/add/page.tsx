"use client";
import axios from "axios";
import { useState } from "react";
import type { AddProductApiRequest } from "@/lib/validators/api-request";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "../../api/uploadthing/core";
import "@uploadthing/react/styles.css"; 

export default function AddProduct() {
	function handleSubmit() {
		const payload: AddProductApiRequest = {
			name: name,
			description: description,
			price: price,
		};
		const res = axios.post("/api/addproduct", payload);
		console.log("api response : ", res);
	}

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);
  const [imageUrls, setImageUrls] = useState<{ url: string }[]>([]);

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
					<div className="mt-10 border-2 border-dotted border-slate-700 py-8 flex flex-col items-center">
						<UploadButton<OurFileRouter>
							endpoint="imageUploader"
							onClientUploadComplete={(res) => {
								console.log("res : ", res);
								if (res) {
									const addedUrls = res.map((file) => ({ url: file.fileUrl }));
									setImageUrls(addedUrls);
								}
								alert("Upload Completed");
							}}
						/>
						{imageUrls.length > 0 && (
							<h1 className="mt-5">{imageUrls.length} images uploaded ✅</h1>
						)}
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
