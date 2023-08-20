"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { ProductCard } from "./ProductCard";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

export const ProductsSlider = () => {
  return (
    <div className="mt-10 mb-10 p-2">
      <h1 className="text-4xl font-semibold ml-2 text-center">Other Products</h1>
      <Swiper
        spaceBetween={10}
        slidesPerView={4}
        modules={[Navigation]}
        navigation = {true}
        className="mt-10"
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          100 : {
            slidesPerView : 1,
          },
          1000 : {
            slidesPerView : 4
          }
        }}
      >
        <SwiperSlide>
          <ProductCard id = "clldivyn30000i9t9tdgdi8yc" name = "some name" price = {100} imgUrl = ""/>
        </SwiperSlide>
        <SwiperSlide>
          <ProductCard id = "dd" name = "some name" price = {100} imgUrl = ""/>
        </SwiperSlide>
        <SwiperSlide>
          <ProductCard id = "dd" name = "some name" price = {100} imgUrl = ""/>
        </SwiperSlide>
        <SwiperSlide>
          <ProductCard id = "dd" name = "some name" price = {100} imgUrl = ""/>
        </SwiperSlide>
        <SwiperSlide>
          <ProductCard id = "dd" name = "some name" price = {100} imgUrl = ""/>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};