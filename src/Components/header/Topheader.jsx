import React, { useContext } from "react";
import { Link } from "react-router-dom";
// import Logo from "../../img/logo.png";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { GiShoppingCart } from "react-icons/gi";
import { BiStoreAlt } from "react-icons/bi";
import { CartContext } from "../context/cartContext";
import SearchBox from "../SearchBox";

export default function Topheader() {
  const { cartItems, favoriteItems } = useContext(CartContext);
  return (
    <div className="Topheader">
      <div className="py-5 mx-5  text-white flex items-center justify-around">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center sm:gap-2 gap-1 outline-none focus:outline-none"
        >
          <BiStoreAlt
            className="sm:w-18 sm:w-20  text-main size-10 "
            alt="logo.png"
          />
          <h3 className="text-md mr-2 sm:text-2xl font-bold text-black ">
            {" "}
            Store
          </h3>
          {/* <img src={Logo} className="w-20 shadow-xl " alt="logo.png" /> */}
        </Link>
        {/* Search */}
        <div className="w-auto sm:w-1/2">
          <SearchBox />
        </div>
        {/* Linkes  */}
        <div className="links flex gap-5">
          <Link to="/favorites" className="relative text-3xl text-black">
            <AiOutlineHeart />
            <span className="heart text-sm absolute top-[-0.4rem] right-[-0.4rem] shadow-md flex items-center justify-center px-[0.3rem] bg-main text-white rounded-full  ">
              {favoriteItems.length}
            </span>
          </Link>
          <Link to="/cart" className="relative text-3xl text-black">
            <GiShoppingCart />
            <span className="count text-sm absolute top-[-0.4rem] right-[-0.4rem] shadow-md flex items-center justify-center px-[0.3rem] bg-main text-white rounded-full ">
              {cartItems.length}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
