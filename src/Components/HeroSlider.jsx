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
    <div className="hero-slider w-full py-4 sm:py-6 lg:py-8 bg-gray-50 overflow-hidden container mx-auto my-6 ">
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
        className="w-full h-full "
      >
        <SwiperSlide className="w-full relative ">
          <div className="absolute inset-0 flex items-center z-10 h-full">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
              <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
                <h4 className="text-sm sm:text-base md:text-lg font-medium uppercase tracking-wider mb-2 text-gray-800">
                  MINI-XGU SPEAKER
                </h4>
                <h3 className="text-lg sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase mb-4 leading-tight text-black">
                  Led Bluetooth
                  <br className="hidden sm:block" />
                  Speaker Lamp
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-6">
                  Support 3.5 mm jack audio input
                </p>
                <Link
                  to="/products"
                  className="inline-block bg-black text-white text-sm sm:text-base py-2 px-6 sm:py-3 sm:px-8 rounded-full hover:bg-gray-800 transition duration-300"
                >
                  SHOP NOW
                </Link>
              </div>
            </div>
          </div>

          <img
            src={imgg}
            className="w-full max-h-[500px] sm:max-h-[600px] lg:max-h-[700px] object-cover object-center"
            alt="Mini XGU Speaker"
          />
        </SwiperSlide>

        <SwiperSlide className="w-full relative ">
          <div className="absolute inset-0 flex items-center z-10 h-full">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
              <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
                <h4 className="text-sm sm:text-base md:text-lg font-medium uppercase tracking-wider mb-2 text-gray-800">
                  MINI-XGU SPEAKER
                </h4>
                <h3 className="text-lg sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase mb-4 leading-tight text-black">
                  Led Bluetooth
                  <br className="hidden sm:block" />
                  Speaker Lamp
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-6">
                  Support 3.5 mm jack audio input
                </p>
                <Link
                  to="/products"
                  className="inline-block bg-black text-white text-sm sm:text-base py-2 px-6 sm:py-3 sm:px-8 rounded-full hover:bg-gray-800 transition duration-300"
                >
                  SHOP NOW
                </Link>
              </div>
            </div>
          </div>

          <img
            src={Img1}
            className="w-full max-h-[500px] sm:max-h-[600px] lg:max-h-[700px] object-cover object-center"
            alt="Mini XGU Speaker"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
