import { ProductCard } from "@/components/ProductCard";
import { Carousel } from "@/components/Carousel";
import prisma from "@/lib/utils/prisma";

// landing page
export default async function Home() {
  const products = await prisma.product.findMany({
    include: {
      imageUrls: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className=''>
      <Carousel />
      <h1 className='mt-20 text-6xl font-semibold text-center font-grace'>
        Trending
      </h1>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-14'>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            imgUrl={
              product.imageUrls[0]?.url ||
              "https://uploadthing.com/f/02c4ee2e-618c-4223-9668-5f40b8f6a8b5_pexels-thorsten-technoman-338504.jpg"
            }
          />
        ))}
      </div>
    </main>
  );
}
