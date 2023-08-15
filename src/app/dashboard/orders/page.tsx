"use client";
import { OrderCard } from "@/components/OrderCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Order } from "@prisma/client";

export default async function OrdersPage() {
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["orders"],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await axios.get(`/api/fetch-orders?page=${pageParam}`);
      return data.data;
    },
    getNextPageParam: (_, pages) => {
      return pages.length + 1;
    },
  });

  console.log("data : ", data);

  if(isFetchingNextPage){
    return <h1>Loading......</h1>
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-semibold mt-8 pl-2">Orders</h1>
      {data?.pages.map((page, index) => (
        <div key = {index}>
          {page.map((order : Order) => (
            <OrderCard
              key={order.id}
              createdAt={order.createdAt.toLocaleString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
              deliveryStatus={order.orderStatus}
              orderId={order.id}
              paymentStatus={order.paymentStatus}
              total={order.total}
            />
          ))}
        </div>
      ))}

      <button
        className="rounded-md"
        onClick={() => {
          fetchNextPage();
        }}
      >
        load more
      </button>
    </div>
  );
}
