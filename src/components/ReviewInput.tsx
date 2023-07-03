"use client";

import { useState } from "react";
import axios, { AxiosError } from "axios";
import { AddReviewApiRequest } from "@/lib/validators/api-request";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { AiOutlineLoading } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { startTransition } from "react";

interface Props {
  productId: string;
}

export const ReviewInput: React.FC<Props> = ({ productId }) => {
  const [reviewText, setReviewText] = useState("");
  const router = useRouter();

  const { isLoading, mutate: handleReviewSubmit } = useMutation({
    mutationFn: async () => {
      const payload: AddReviewApiRequest = {
        reviewText,
        productId,
      };
      await axios.post("/api/addreview", payload);
    },
    onSuccess: () => {
      toast.success("Review added successfully !");
      startTransition(() => {
        router.refresh();
      });
    },
    onError: (e: AxiosError) => {
      if (e.response?.status === 401) {
        // Unauthorized
        toast.error("Please Login to post a review !");
        return;
      } else {
        toast.error("Some error occured !");
      }
    },
  });

  return (
    <div className='w-full mt-5'>
      <textarea
        className='outline-none rounded-sm border-2 border-gray-300 w-full px-4 py-2'
        placeholder='Write a review ...'
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      />
      <button
        className='px-4 py-2 rounded-md bg-yellow-400'
        onClick={() => {
          handleReviewSubmit();
        }}
      >
        <div className='flex justify-center items-center'>
          {isLoading && <AiOutlineLoading className='animate-spin mr-2' />}
          Post Review
        </div>
      </button>
    </div>
  );
};
