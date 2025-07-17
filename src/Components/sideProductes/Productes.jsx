import React, { useContext, useRef } from "react";
import { AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { FaStarHalfAlt } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";
import { FaShare } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartContext } from "../context/cartContext";
import { AiOutlineCheck } from "react-icons/ai";
import toast from "react-hot-toast";
import PageTransitions from "../PageTransitions";

export default function Productes({ item }) {
  const { cartItems, addCartItem } = useContext(CartContext);

  const handleAddToCart = () => {
    addCartItem(item);
    toast.success(
      <div className="container flex gap-5 p-5 rounded-md shadow-lg shadow-black">
        <img
          src={item.images[0]}
          className="w-20 h-20 object-cover"
          alt={item.title}
        />
        <div className="content flex flex-col">
          <h5 className="text-md font-bold ">{item.title}</h5>
          <small className="py-1 text-md">Items Added</small>
          <Link
            to="/cart"
            className="p-2 cursor-pointer rounded-md text-white flex justify-center items-center
             bg-black/50 hover:bg-black/100  transition-all"
          >
            <button>View Cart</button>
          </Link>
        </div>
      </div>
    );
  };
  // Check if the item is already in the cart or not
  const isINCart = cartItems.some((cartitem) => cartitem.id === item.id);

  // console.log(cartItems); // to check the cartItems added

  const ShowIcones = useRef();
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <PageTransitions>
      <div
        className="productes relative w-full h-[350px] flex flex-col mt-3 border-2 border-border    rounded-xl overflow-hidden hover:border-main pb-6   hover:shadow-md   "
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`flex justify-center items-center gap-[5px] mx-auto w-33 px-3 py-1 text-white bg-black/90 rounded-b-md  font-bolder translate-y-[-100%] transition opacity-90 ${
            isINCart ? "translate-y-[0%]" : ""
          }`}
        >
          <AiOutlineCheck className="text-green-500" />
          Done
        </div>
        <Link
          to={`/productes/${item.id}`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="imageProducts w-full object-cover h-[200px] mb-8 flex justify-center items-cente ">
            <img
              className="w-50 h-50  object-center"
              src={
                item.images.find((img) => !!img) ??
                "https://placehold.co/600x400"
              }
              alt="product"
            />
          </div>

          <p className="nameProduct text-md normal  line-clamp-2 px-3">
            {item.title}
          </p>
          <div className="stars flex px-3 text-yellow-500 py-2">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <FaStarHalfAlt />
          </div>
          <div className="price px-3 font-bold text-md text-main">
            ${item.price}
          </div>
        </Link>
        <div
          ref={ShowIcones}
          className={`icons absolute top-1/4 right-3 flex gap-2  flex-col justify-center items-center transition-all opacity-100  ${
            isHovered
              ? " translate-x-0"
              : " translate-y-[130%] translate-x-[130%]  "
          }`}
        >
          <div
            className={`size-15 bg-bg p-5 rounded-full flex justify-center items-center text-main cursor-pointer 
          ${isINCart ? "bg-main/80 text-white pointer-events-none " : ""} `}
            onClick={handleAddToCart}
          >
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
    </PageTransitions>
  );
}
