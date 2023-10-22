"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { ProductCard } from "./ProductCard";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

interface ProductsSliderProps {
  products: {
    name: string;
    id: string;
    price: number;
    imageUrls: { url: string }[];
  }[];
}

export const ProductsSlider = (props: ProductsSliderProps) => {
  return (
    <div className="mt-10 mb-10 p-2">
      <h1 className="text-4xl font-semibold ml-2 text-center">
        Other products
      </h1>
      <Swiper
        spaceBetween={10}
        slidesPerView={4}
        modules={[Navigation]}
        navigation={true}
        className="mt-10"
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          500: {
            slidesPerView: 2,
          },
          100: {
            slidesPerView: 1,
          },
          1000: {
            slidesPerView: 4,
          },
        }}
      >
        {props.products.map((product) => {
          return (
            <SwiperSlide>
              <ProductCard
                id={product.id}
                name={product.name}
                price={product.price}
                imgUrl={product.imageUrls[0].url || ""}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
