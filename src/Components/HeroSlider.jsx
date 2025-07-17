import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Img1 from "../../src/img/banner_Hero2.jpg";
import imgg from "../../src/img/banner_Hero1.jpg";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

export default function HeroSlider() {
  return (
    <div className="hero-slider w-full h-[70vh] min-h-[400px] md:h-[85vh] md:min-h-[550px] bg-gray-50 overflow-hidden container mx-auto my-5">
      <Swiper
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        speed={800}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="h-full w-full"
      >
        <SwiperSlide className="w-full h-full relative">
          <div className="absolute inset-0 flex items-center z-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
                <h4 className="text-sm sm:text-base md:text-lg font-medium uppercase tracking-wider mb-1 sm:mb-2 text-gray-800">
                  MINI-XGU SPEAKER
                </h4>
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase mb-3 sm:mb-4 leading-tight text-black">
                  Led Bluetooth
                  <br className="hidden sm:block" />
                  Speaker Lamp
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-4 sm:mb-6">
                  Support 3.5 mm jack audio input
                </p>
                <Link
                  to="/products"
                  className="inline-block bg-black text-white text-xs sm:text-sm md:text-base py-2 px-6 sm:py-3 sm:px-8 rounded-full hover:bg-gray-800 transition duration-300"
                >
                  SHOP NOW
                </Link>
              </div>
            </div>
          </div>

          <img
            src={imgg}
            className="w-full h-[40vh] sm:h-full object-cover object-center"
            alt="Mini XGU Speaker"
          />
        </SwiperSlide>

        <SwiperSlide className="w-full h-full relative">
          <div className="absolute inset-0 flex items-center z-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
                <h4 className="text-sm sm:text-base md:text-lg font-medium uppercase tracking-wider mb-1 sm:mb-2 text-gray-800">
                  MINI-XGU SPEAKER
                </h4>
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase mb-3 sm:mb-4 leading-tight text-black">
                  Led Bluetooth
                  <br className="hidden sm:block" />
                  Speaker Lamp
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-4 sm:mb-6">
                  Support 3.5 mm jack audio input
                </p>
                <Link
                  to="/products"
                  className="inline-block bg-black text-white text-xs sm:text-sm md:text-base py-2 px-6 sm:py-3 sm:px-8 rounded-full hover:bg-gray-800 transition duration-300"
                >
                  SHOP NOW
                </Link>
              </div>
            </div>
          </div>
          <img
            src={Img1}
            className="w-full h-[40vh] sm:h-full object-cover object-center"
            alt="Mini XGU Speaker"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
