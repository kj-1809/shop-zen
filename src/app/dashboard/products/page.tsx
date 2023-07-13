import { ProductAdminCard } from "@/components/ProductAdminCard";
import prisma from "@/lib/utils/prisma";
export default async function Products() {
  const products = await prisma.product.findMany({
    include: {
      imageUrls: true,
    },
  });
  return (
    <div>
      <h1 className='text-4xl font-semibold'>Products</h1>
      {products.map((product) => (
        <ProductAdminCard
          key={product.id}
          name={product.name}
          imgUrl={product.imageUrls[0]?.url}
          price={product.price}
        />
      ))}
    </div>
  );
}
