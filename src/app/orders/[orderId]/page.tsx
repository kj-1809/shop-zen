import prisma from "@/lib/utils/prisma";
import Image from "next/image";
export default async function OrderDetail({
  params,
}: {
  params: {
    orderId: string;
  };
}) {
  console.log(params);

  if (isNaN(parseInt(params.orderId))) {
    return <h1>enter a valid orderId</h1>;
  }

  const orderDetails = await prisma.order.findFirst({
    where: {
      id: parseInt(params.orderId),
    },
    include: {
      items: {
        include: {
          product: {
            include: {
              imageUrls: true,
            },
          },
        },
      },
    },
  });

  if (!orderDetails) {
    return <h1>No order found with that order ID</h1>;
  }

  console.log(orderDetails);

  return (
    <div className='flex'>
      <div className='shadow-md rounded-md p-2 w-full m-2'>
        <h1 className='text-3xl font-semibold'>Order Details</h1>
        <h1>
          Created at :
          {orderDetails?.createdAt.toLocaleString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </h1>
        <h1>Order Id : {orderDetails?.id}</h1>
        <h1>Address : {orderDetails?.address}</h1>
        <h1>Order Status : {orderDetails?.orderStatus}</h1>
        <h1>Payment Status : {orderDetails?.paymentStatus}</h1>
        <h1>Total : {orderDetails?.total}</h1>
        <h1>User ID : {orderDetails?.userId}</h1>

        <h1 className='text-2xl font-semibold mt-2'>Items</h1>
        {orderDetails.items.map((item) => {
          return (
            <div
              className='border-2 rounded-md shadow-md p-2 m-1'
              key={item.id}
            >
              <Image
                src={item.product?.imageUrls[0].url || ""}
                height={200}
                width={200}
                alt='product-img'
                className='rounded-md'
              />
              <h1>Quantity : {item.quantity}</h1>
              <h1>Product Id : {item.productId}</h1>
              <h1>Product Name: {item.product?.name}</h1>
              <h1>Product Price : {item.product?.price}</h1>
              <h1>Product Description : {item.product?.description}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}
