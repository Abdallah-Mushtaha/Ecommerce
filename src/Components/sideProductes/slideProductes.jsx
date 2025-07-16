import React from "react";
import Productes from "./Productes";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function SlideProductes({ title }) {
  return (
    <div className="sideProductes slide pt-12  mt-[1.5rem]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="topSlide relative mb-5 p-[0.9rem] pb-2 border-b-2  border-border 
  after:content-[''] after:absolute after:-bottom-[1px] after:left-0 
  after:w-[100px] after:h-[2px] after:bg-main"
        >
          <h2 className="text-2xl font-bold text-main">{title}</h2>
          <h3 className="mb-2">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet,
            rerum.
          </h3>
        </div>

        <Swiper
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          spaceBetween={5}
          loop={true}
          speed={800}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="h-full w-full"
        >
          <SwiperSlide>
            <Productes />
          </SwiperSlide>
          <SwiperSlide>
            <Productes />
          </SwiperSlide>{" "}
          <SwiperSlide>
            <Productes />
          </SwiperSlide>{" "}
          <SwiperSlide>
            <Productes />
          </SwiperSlide>{" "}
          <SwiperSlide>
            <Productes />
          </SwiperSlide>{" "}
          <SwiperSlide>
            <Productes />
          </SwiperSlide>{" "}
          <SwiperSlide>
            <Productes />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
