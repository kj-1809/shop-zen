"use client";
import Image from "next/image";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import 'swiper/css/pagination';

import { Autoplay, Pagination, Navigation } from "swiper/modules";

export const Carousel = () => {
  const slides = [
    {
      title: "Shirtacular Styles",
      description: "Your Wardrobe Essentials",
      imgUrl:
        "https://uploadthing.com/f/03b7c97c-43e8-40cc-9a7b-169216283395-gsq3rm.jpg",
    },
    {
      title: "Closet Refresh",
      description: "Revolving Shirt Showcase",
      imgUrl:
        "https://uploadthing.com/f/b1d4f432-b1af-4050-8018-8198024487cf-hfcqti.jpg",
    },
    {
      title: "Tees & Tops Extravaganza",
      description: "Spin & Shop",
      imgUrl:
        "https://uploadthing.com/f/67c1466e-c0b8-4153-9b2e-1abab47d21e7-i3jz3t.jpg",
    },
  ];

  return (
    <div className="h-[80vh]">
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        navigation={true}
        modules={[Navigation , Autoplay , Pagination]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets : true,
        }} 
      >
        {slides.map((slide) => {
          return (
            <SwiperSlide>
              <div className="relative h-[80vh]">
                <Image
                  src={`${slide.imgUrl}`}
                  alt="carousel-img"
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div className="absolute bottom-4 left-4">
                  <h1 className="font-bold text-4xl text-black">
                    {slide.title}
                  </h1>
                  <h1 className="font-semibold text-2xl text-black">
                    {slide.description}
                  </h1>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
