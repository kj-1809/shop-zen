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
      title: "Some title mate",
      description: "Some description",
      imgUrl:
        "https://uploadthing.com/f/02c4ee2e-618c-4223-9668-5f40b8f6a8b5_pexels-thorsten-technoman-338504.jpg",
    },
    {
      title: "Some other title mate",
      description: "Some description",
      imgUrl:
        "https://uploadthing.com/f/23db9644-b217-426a-bf62-8518eb763992_pexels-freemockupsorg-775219.jpg",
    },
    {
      title: "Some other other title mate",
      description: "Some description",
      imgUrl:
        "https://uploadthing.com/f/1fde90fe-98e1-4662-9825-7b9e10139f51_pexels-pixabay-262047.jpg",
    },
  ];

  return (
    <div className="h-[70vh]">
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
              <div className="relative h-[70vh]">
                <Image
                  src={`${slide.imgUrl}`}
                  alt="carousel-img"
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div className="absolute bottom-4 left-4">
                  <h1 className="font-bold text-4xl text-white">
                    {slide.title}
                  </h1>
                  <h1 className="font-semibold text-2xl text-white">
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
