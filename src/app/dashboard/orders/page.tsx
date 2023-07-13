import prisma from "@/lib/utils/prisma";
import { OrderCard } from "@/components/OrderCard";
export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className='flex flex-col'>
      {orders.map((order) => {
        return (
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
        );
      })}
    </div>
  );
}
