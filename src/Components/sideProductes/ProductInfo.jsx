import React, { useContext } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FaStarHalfAlt } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";
import { AiFillStar } from "react-icons/ai";
import { CartContext } from "../context/cartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

//  Items Ditales Box in Disktop

export default function ProductInfo({ items }) {
  const { cartItems, addCartItem } = useContext(CartContext);

  const handleAddToCart = () => {
    addCartItem(items);
    toast.success(
      <div className="container flex gap-5 p-5 rounded-md  shadow-black">
        <img
          src={items.images[0]}
          className="w-20 h-20 object-cover"
          alt={items.title}
        />
        <div className="content flex flex-col">
          <h5 className="text-md font-bold ">{items.title}</h5>
          <small className="py-1 text-md">Items Added</small>
          <Link
            to="/cart"
            className="p-2 cursor-pointer rounded-md text-white flex justify-center items-center
             bg-black/50 hover:bg-black/100   transition-all"
          >
            <button>View Cart</button>
          </Link>
        </div>
      </div>,
      { duration: 800 }
    );
  };
  // Check if the item is already in the cart or not
  const isINCart = cartItems.some((cartitem) => cartitem.id === items.id);

  return (
    <div className="itemDitales sm:hidden lg:flex flex flex-col gap-2 justify-start sm:pt-10 items-start">
      {/* Items Ditales Box in Disktop  */}
      <div className="hidden sm:block">
        <h2 className="text-main font-bold text-md  sm:text-2xl flex flex-row justify-start items-center gap-10 ">
          {items.title}
          <button>
            <AiOutlineHeart className="my-4 text-black bg-gray-300 rounded-full p-2 size-9 hover:bg-red-600 transition hover:text-white" />
          </button>
        </h2>
        <div className="stars flex  text-yellow-500 py-2">
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <FaStarHalfAlt />
        </div>
        <small className="price text-black font-bold text-sm sm:text-lg">
          ${items.price}
        </small>
        <h6 className="availabilityStatus font-bold">
          availability :{" "}
          <span className="text-main">{items.availabilityStatus}</span>
        </h6>
        <h6 className="brand font-bold ">
          Brand : <span className="text-main"> {items.brand}</span>
        </h6>

        <p className="text-gray-600/70 text-md tracking-tighter line-clamp- sm:w-full ">
          {items.description}
        </p>
        <small className="text-main font-bold  text-lg py-2">
          Hurry Up! Only {items.stock} products left in stock.
        </small>
        <button
          className={`  py-3 font-bold px-3 rounded-full flex items-center gap-2 hover:bg-main justify-center my-5 text-center transition-all ${
            isINCart
              ? "bg-black/0 border-2 text-black pointer-events-none border-black "
              : "bg-black/100 text-white border-none"
          }`}
          onClick={handleAddToCart}
        >
          {isINCart ? "Done Added" : "Add to Cart"}
          <GiShoppingCart />
        </button>
      </div>
    </div>
  );
}
