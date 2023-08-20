import Image from "next/image";
export const SlidingProductCard = ({
  url,
  name,
  price,
}: {
  url: string;
  name: string;
  price: number;
}) => {
  return (
    <div className="rounded-md h-80 w-full shadow-md p-2 m-2">
      <div className="relative h-64 w-full">
        <Image
          src={
            url
              ? url
              : "https://utfs.io/f/df67f7ca-2460-45c6-84ad-4f0d428c5850_pexels-matheus-guimara%CC%83es-1291766.jpg"
          }
          alt="product-img"
          fill
        />
      </div>

      <h1>{name}</h1>
      <h1>{price}</h1>
    </div>
  );
};
