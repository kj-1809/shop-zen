import prisma from "@/lib/utils/prisma";
import { auth } from "@clerk/nextjs";
import { OrderCard } from "@/components/OrderCard";
import { redirect } from "next/navigation";

export default async function MyOrders() {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: userId as string,
    },
    orderBy: {
      id: "desc",
    },
  });
  return (
    <div className='p-2'>
      <h1 className='mt-10 text-5xl text-center font-semibold mb-10'>
        My orders
      </h1>
      {orders.map((order) => {
        return (
          <OrderCard
            key={order.id}
            orderId={order.id}
            total={order.total}
            deliveryStatus={order.orderStatus}
            paymentStatus={order.paymentStatus}
            createdAt={order.createdAt?.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          />
        );
      })}
    </div>
  );
}
