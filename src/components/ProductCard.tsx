import Image from "next/image";
import Link from "next/link";

interface Props {
  name: string;
  price: number;
  imgUrl: string;
  id: string;
}

export const ProductCard: React.FC<Props> = ({ name, price, imgUrl, id }) => {
  return (
    <Link href={`/products/${id}`}>
      <div className="m-2 p-2 flex flex-col items-center">
        <div className="relative rounded-md lg:h-60 lg:w-60 xl:h-80 xl:w-80 md:h-60 md:w-60 sm:w-60 sm:h-60 min-[450px]:h-52 min-[450px]:w-52 min-[380px]:h-44 min-[380px]:w-44 h-36 w-36">
          <Image
            src={
              imgUrl
                ? imgUrl
                : "https://utfs.io/f/df67f7ca-2460-45c6-84ad-4f0d428c5850_pexels-matheus-guimara%CC%83es-1291766.jpg"
            }
            alt="productimg"
            fill
            style={{ objectFit: "cover" }}
            className="rounded-md"
          />
        </div>
        <h1 className="font-medium text-lg mt-3">{name}</h1>
        <h1 className="font-semibold text-xl">
          Rs. {price.toLocaleString("en-IN")}
        </h1>
      </div>
    </Link>
  );
};
