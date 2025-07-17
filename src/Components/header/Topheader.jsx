import React, { useContext } from "react";
import { Link } from "react-router-dom";
// import Logo from "../../img/logo.png";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { GiShoppingCart } from "react-icons/gi";
import { BiStoreAlt } from "react-icons/bi";
import { CartContext } from "../context/cartContext";

export default function Topheader() {
  const { cartItems } = useContext(CartContext);
  return (
    <div className="Topheader">
      <div className="py-5   text-white flex items-center justify-around">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center   gap-2 outline-none focus:outline-none"
        >
          <BiStoreAlt
            className="w-18 sm:w-20  text-main size-10 "
            alt="logo.png"
          />
          <h3 className="text-2xl font-bold text-black "> Store</h3>
          {/* <img src={Logo} className="w-20 shadow-xl " alt="logo.png" /> */}
        </Link>
        {/* Search */}
        <form
          action=""
          className="Search_item w-1/2 flex bg-gray-100 p-2  items-center rounded-full"
        >
          <input
            className="outline-none w-full px-2 py-1 bg-transparent text-gray-600  font-semibold text-sm  "
            type="text"
            placeholder="Search"
            name="search"
            id="search"
          />
          <button className="search_btn bg-main p-3 rounded-full" type="submit">
            <AiOutlineSearch />
          </button>
        </form>
        {/* Linkes  */}
        <div className="links flex gap-5">
          <Link to="/favorites" className="relative text-3xl text-black">
            <AiOutlineHeart />
            <span className="heart text-sm absolute top-[-0.4rem] right-[-0.4rem] shadow-md flex items-center justify-center px-[0.3rem] bg-main text-white rounded-full  ">
              0
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
