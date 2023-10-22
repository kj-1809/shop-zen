import prisma from "@/lib/utils/prisma";
import { ProductsSlider } from "./ProductsSlider";

interface ProductsSliderFetcherProps {
  id: string;
}

export const ProductsSliderFetcher = async (
  props: ProductsSliderFetcherProps
) => {
  // ideally an AI algo should be used or some sort of categorization
  const sliderProducts = await prisma.product.findMany({
    take: 4,
    select: {
      name: true,
      price: true,
      imageUrls: true,
      id: true,
    },
    where: {
      id: {
        not: props.id,
      },
    },
  });

  return <ProductsSlider products={sliderProducts} />;
};
