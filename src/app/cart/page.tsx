"use client";
import { CartItemCard } from "@/components/CartItemCard";
import { ContinueToCheckoutCard } from "@/components/ContinueToCheckoutCard";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { ImageUrl, CartItem } from "@prisma/client";
import { LoadingBar } from "@/components/LoadingBar";

type DenseCartItem = CartItem & {
  product: {
    name: string;
    imageUrls: ImageUrl[];
    price: number;
  };
};

export default async function Cart() {
  const { isLoading, data: cartItems } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const { data } = await axios.get("api/cart");
      return data;
    },
    onError: (e: AxiosError) => {
      if (e.response?.status === 500) {
        toast.error("Some internal error occured");
      }
    },
    onSuccess: (data) => {
      console.log("data : ", data);
    },
  });

  if (isLoading) {
    return <LoadingBar />;
  }

  return (
    <div className='p-2 grid grid-cols-1 md:grid-cols-5'>
      <div className='col-span-3'>
        {cartItems.length === 0 ? (
          <h1 className='font-semibold text-2xl mt-5 ml-5'>Cart is empty !</h1>
        ) : (
          <h1 className='font-semibold text-4xl mt-5 ml-5'>Cart</h1>
        )}
        {cartItems.map((cartItem: DenseCartItem) => (
          <CartItemCard
            imgUrl={cartItem.product.imageUrls[0]?.url || ""}
            key={cartItem.id}
            name={cartItem.product.name}
            price={cartItem.product.price}
            quantity={cartItem.quantity}
            id={cartItem.id}
          />
        ))}
      </div>
      <div className='col-span-2'>
        {cartItems.length !== 0 && (
          <ContinueToCheckoutCard cartItems={cartItems} />
        )}
      </div>
    </div>
  );
}
