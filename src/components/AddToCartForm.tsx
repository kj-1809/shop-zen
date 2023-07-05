"use client";

import { AddToCartApiRequest } from "@/lib/validators/api-request";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { AiOutlineLoading } from "react-icons/ai";

interface Props {
  productId: string;
}

export const AddToCartForm: React.FC<Props> = ({ productId }) => {
  const queryClient = useQueryClient();

  const { isLoading, mutate: handleAddToCart } = useMutation({
    mutationFn: async () => {
      const payload: AddToCartApiRequest = {
        productId: productId,
        quantityModifier: 1,
      };
      return await axios.post("/api/add-product-to-cart", payload);
    },
    onSuccess: () => {
      toast.success("Product Added to Cart Successfully");
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 401) {
        toast.error("Please login to add products to the Cart !");
      } else {
        toast.error("error occured !");
      }
    },
  });

  return (
    <button
      className='px-5 py-2 bg-yellow-400 rounded mt-10 w-full'
      onClick={() => {
        handleAddToCart();
      }}
    >
      <div className='flex justify-center items-center'>
        {isLoading && <AiOutlineLoading className='animate-spin mr-2' />}
        Add to Cart
      </div>
    </button>
  );
};
