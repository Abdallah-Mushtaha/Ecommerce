import React, { useContext, useRef, useState } from "react";
import { AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { FaStarHalfAlt } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";
import { FaShare } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/cartContext";
import { AiOutlineCheck } from "react-icons/ai";
import toast from "react-hot-toast";
import PageTransitions from "../PageTransitions";

export default function Productes({ item }) {
  // Check if the item is already in the cart or not

  const {
    cartItems,
    addCartItem,
    removeCartItem,
    addFavoriteItem,
    removeFavoriteItem,
    favoriteItems,
  } = useContext(CartContext);

  const navigate = useNavigate();

  const [ClickedFav, setClickedFav] = useState(false);

  const isINFavorite = favoriteItems.some(
    (favoriteItem) => favoriteItem.id === item.id
  );

  const handelFavCart = () => {
    if (isINFavorite) {
      removeFavoriteItem(item.id);
      setClickedFav(false);
    } else {
      const result = addFavoriteItem(item);
      if (!result) {
        // Store the Previous Action
        localStorage.setItem(
          "pendingAction",
          JSON.stringify({
            type: "Favorite",
            item: item,
          })
        );
        navigate("/login");
        return;
      }
      setClickedFav(true);
      toast.success(
        <h1 className="text-md font-normal">{item.title}Added To Favorite</h1>
      );
    }

    // console.log(favoriteItems);
  };

  //   Cart Items

  // Check if the item is already in the cart or not
  const isINCart = cartItems.some((cartitem) => cartitem.id === item.id);
  const [ClickedCart, setClickedCart] = useState(false);

  const handleAddToCart = () => {
    if (isINCart) {
      removeCartItem(item.id);
      setClickedCart(false);
    } else {
      const result = addCartItem(item);
      if (!result) {
        // Store the Previous Action
        localStorage.setItem(
          "pendingAction",
          JSON.stringify({
            type: "cart",
            item: item,
          })
        );
        navigate("/login");
        return;
      }

      setClickedCart(true);
      toast.success(
        <h1 className="text-md font-normal">{item.title}Added To Cart</h1>
      );
    }
  };

  // console.log(cartItems); // to check the cartItems added

  const ShowIcones = useRef();
  const [isHovered, setIsHovered] = useState(false);
  // console.log(item);

  if (!item) {
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex flex-row gap-2 ">
        <div className="animate-pulse bg-gray-300 w-14 h-14 rounded-lg"></div>
        <div className="flex flex-col gap-2">
          <div className="animate-pulse bg-gray-300 w-28 h-5 rounded-lg"></div>
          <div className="animate-pulse bg-gray-300 w-36 h-3 rounded-lg"></div>
          <div className="animate-pulse bg-gray-300 w-36 h-2 rounded-lg"></div>
        </div>
      </div>
    </div>;
  } else {
    return (
      <PageTransitions>
        <div
          className="productes relative w-full h-[388px] flex flex-col mt-3 border-2 border-border    rounded-xl overflow-hidden hover:border-main transition-all pb-6   hover:shadow-md   "
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
          <Link to={`/productes/${item.id}`}>
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
            <div className="stars flex px-3 text-yellow-500 py-1">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <FaStarHalfAlt />
            </div>
            <div className="price px-3 font-bold text-md text-green-600 flex flex-row justify-start items-start gap-5 py-2 ">
              ${item.price}
              <del className="text-xs text-red-400 mb-4 pb-3">
                {item.discountPercentage} %
              </del>
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
              className={`size-15 p-5 rounded-full flex justify-center items-center cursor-pointer 
          ${
            ClickedCart || isINCart
              ? "bg-black/90 text-white   "
              : "bg-bg text-main"
          } `}
              onClick={handleAddToCart}
            >
              <GiShoppingCart />
            </div>
            <div
              className={`size-15 p-5 rounded-full flex justify-center items-center  cursor-pointer ${
                ClickedFav || isINFavorite
                  ? "bg-red-500/90 text-white  "
                  : "bg-bg text-main "
              }`}
              onClick={handelFavCart}
            >
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
}
