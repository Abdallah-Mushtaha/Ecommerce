import React, { useRef } from "react";
import { AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { FaStarHalfAlt } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";
import { FaShare } from "react-icons/fa";

export default function Productes() {
  const ShowIcones = useRef();
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <div
      className="productes relative w-full  flex flex-col  border-2 border-border    rounded-xl overflow-hidden hover:border-main pb-6   hover:shadow-md  "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="imageProducts w-full object-cover h-auto bg-main mb-8">
        <img
          className="size-50 flex justify-center items-center"
          src="https://tse1.mm.bing.net/th/id/OIP.zV2nK7gGuuXoPox-QepYZgHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
          alt="image mobile"
        />
      </div>
      <p className="nameProduct text-md normal  line-clamp-2 px-3">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint,
        obcaecati.
      </p>
      <div className="stars flex px-3 text-yellow-500 py-2">
        <AiFillStar />
        <AiFillStar />
        <AiFillStar />
        <AiFillStar />
        <FaStarHalfAlt />
      </div>
      <div className="price px-3 font-bold text-md text-main">$100</div>
      <div
        ref={ShowIcones}
        className={`icons absolute top-1/4 right-3 flex gap-2 traslate-y-[-100%] translate-x-[150%]  flex-col justify-center items-center transition-all ${
          isHovered
            ? "opacity-100 translate-x-0"
            : "opacity-100 translate-x-[150%]"
        }`}
      >
        <div className="size-15 bg-bg p-5 rounded-full flex justify-center items-center text-main cursor-pointer">
          <GiShoppingCart />
        </div>
        <div className="size-15 bg-bg p-5 rounded-full flex justify-center items-center text-main cursor-pointer">
          <AiOutlineHeart />
        </div>
        <div className="size-15 bg-bg p-5 rounded-full flex justify-center items-center text-main cursor-pointer">
          <FaShare />
        </div>
      </div>
    </div>
  );
}
