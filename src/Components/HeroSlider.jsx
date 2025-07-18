import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

export default function HeroSlider() {
  const [slidesData, setSlidesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=3")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.products.map((item) => ({
          id: item.id,
          image: item.thumbnail,
          subtitle: "MINI-XGU SPEAKER",
          title: (
            <>
              {item.title}
              <br className="hidden sm:block" />
              Speaker Lamp
            </>
          ),
          description: item.description,
        }));
        setSlidesData(formatted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching slider data:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="hero-slider w-full py-4 sm:py-6 lg:py-8 bg-gray-50 overflow-hidden container mx-auto my-6">
      {loading ? (
        <div class="relative flex w-64 animate-pulse gap-2 p-4 justify-center items-center">
          <div class="h-12 w-12 rounded-full bg-slate-400"></div>
          <div class="flex-1">
            <div class="mb-1 h-5 w-3/5 rounded-lg bg-slate-400 text-lg"></div>
            <div class="h-5 w-[90%] rounded-lg bg-slate-400 text-sm"></div>
          </div>
          <div class="absolute bottom-5 right-0 h-4 w-4 rounded-full bg-slate-400"></div>
        </div>
      ) : (
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
          className="w-full h-full"
        >
          {slidesData.map((slide, index) => (
            <SwiperSlide
              key={index}
              className="w-100 flex flex-row md:flex-row items-center justify-between"
            >
              <div className="flex justify-content-between items-center w-100 p-5 ">
                <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
                  <h4 className="text-sm sm:text-base md:text-lg font-medium uppercase tracking-wider mb-2 text-gray-800">
                    {slide.subtitle}
                  </h4>
                  <h3 className="text-xl  sm:text-2xl md:text-3xl lg:text-4xl font-bold uppercase mb-4 leading-tight text-black">
                    {slide.title}
                  </h3>
                  <p className="text-sm sm:text-base line-clamp-2 text-gray-600 mb-6">
                    {slide.description}
                  </p>
                  <Link
                    to={`/productes/${slide.id}`}
                    className="inline-block bg-black text-white text-sm sm:text-base py-2 px-6 sm:py-3 sm:px-8 rounded-full hover:bg-gray-800 transition duration-300"
                  >
                    SHOP NOW
                  </Link>
                </div>

                <img
                  src={slide.image ?? "https://via.placeholder.com/300x200"}
                  className="w-52 sm:w-72 max-w-md h-auto max-h-[400px] md:max-h-[500px] object-contain object-center"
                  alt="Mini XGU Speaker"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
