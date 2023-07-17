import { ProductCard } from "@/components/ProductCard";
import { Carousel } from "@/components/Carousel";
import prisma from "@/lib/utils/prisma";

// function wait(duration : number){
// 	return new Promise((resolve) => {
// 		setTimeout(resolve , duration)
// 	})
// }
export default async function Home() {
  const products = await prisma.product.findMany({
    include: {
      imageUrls: true,
    },
    take: 3,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className=''>
      <Carousel />
      <h1 className='mt-10 text-5xl font-semibold text-center font-grace'>
        Trending
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4'>
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
