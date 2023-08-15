"use client";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import type {
  UpdateProductApiRequest,
} from "@/lib/validators/api-request";
import { OurFileRouter } from "../../../api/uploadthing/core";
import "@uploadthing/react/styles.css";
import { UploadButton } from "@uploadthing/react";
import { toast } from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AiOutlineLoading } from "react-icons/ai";

export default function EditProduct({
  params,
}: {
  params: { productId: string };
}) {
  const { isLoading: isFetching } = useQuery({
    // not sure if the convention of naming query key is correct
    queryKey: ["fetch-product", "id"],
    queryFn: async () => {
      const { data } = await axios.get(
        `/api/products/get-detail?productId=${params.productId}`
      );
      return data;
    },
    onSuccess: (data) => {
      console.log(data)
      setName(data.productData.name);
      setDescription(data.productData.description);
      setPrice(data.productData.price);
      setImageUrls(data.productData.imageUrls);
    },
    onError: (err: AxiosError) => {
      console.log(err);
    },
  });

  const { isLoading, mutate: handleSubmit } = useMutation({
    mutationFn: async () => {
      const payload: UpdateProductApiRequest = {
        productId: params.productId,
        name: name,
        description: description,
        price: price,
        imageUrls: imageUrls,
      };
      await axios.post("/api/products/update", payload);
    },
    onSuccess: () => {
      toast.success("Successfully updated product !");
    },
    onError: (e: any) => {
      console.log(e)
      toast.error(`Some error occured : ${e.response.data.error}`);
    },
  });

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [imageUrls, setImageUrls] = useState<{ url: string }[]>([]);

  if (isFetching) {
    return <h1>Fetching product data....</h1>;
  }

  return (
    <div className="p-2">
      <h1 className="text-3xl font-semibold mt-10 text-center">Edit Product</h1>
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
              onUploadError={(error: Error) => {
                // Do something with the error.
                console.log(error);
                alert(`ERROR! ${error.message}`);
              }}
            />
            {imageUrls && imageUrls.length > 0 && (
              <h1 className="mt-5">{imageUrls.length} images uploaded ✅</h1>
            )}
          </div>

          <button
            className="rounded-md px-4 py-2 bg-yellow-400 w-full mt-5"
            onClick={() => {
              handleSubmit();
            }}
          >
            <div className="flex justify-center items-center">
              {isLoading && <AiOutlineLoading className="animate-spin mr-2" />}
              Edit Product
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
