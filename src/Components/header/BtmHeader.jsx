import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";
import { FiUserPlus } from "react-icons/fi";
import { FaSignInAlt } from "react-icons/fa";
import Authcontext from "../Account/Auth";
import toast from "react-hot-toast";

export default function BtmHeader() {
  const { logout } = useContext(Authcontext);
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    Navigate("/userAccounts");
  };

  // Also we can hide the categoriesNavList using CSS by clip-path
  const categoresNavList = useRef();
  const currentLocation = useLocation();
  // Array of linkes
  const Linkes = [
    { title: "Home", link: "/" },
    { title: "About", link: "/about" },
    { title: "Acsessories", link: "/Acsessories" },
    { title: "Blogs", link: "/blog" },
    { title: "Contact", link: "/contact" },
  ];
  // to track categories
  const [categories, setCategories] = useState([]);
  // Fetch categories from api
  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    categoresNavList.current.classList.add("hidden");
  }, [currentLocation.pathname]);

  if (!categories) {
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
      <div className="BtmHeader bg-main text-white text-md   relative bottom-0 ">
        <div className="flex flex-col sm:flex-row  items-center justify-around py-5 sm:py-0">
          {/* flex in mobile  */}
          <div className="flex justify-between items-center gap-5">
            {/* Ctegories */}
            <div className="categoresNav flex flex-col mb-2 sm:mb-0">
              {/* CategorieBTN */}
              <button
                className="categoriesBtn flex items-center gap-2 relative"
                onClick={() => {
                  // IF clicked show categoriesNavList else hide
                  categoresNavList.current.classList.toggle("hidden");
                }}
              >
                <FiMenu />
                <p>Categories</p>
                <IoMdArrowDropdown />
              </button>
              {/* Catiegorie Nav list comes from api */}
              <div
                ref={categoresNavList}
                className="categoresNavList absolute top-[3rem]   flex-col gap-2 max-h-[12rem] overflow-y-scroll bg-gray-100 p-2 hidden text-black z-10   "
              >
                {categories.map((category, index) => {
                  return (
                    <Link
                      to={`/category/${category.slug}`}
                      key={categories + index}
                    >
                      <p
                        className=" border-b-2 border-gray-200 p-2 hover:bg-main hover:text-white "
                        onClick={() => {
                          categoresNavList.current.classList.add("hidden");
                        }}
                      >
                        {category.name}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="signIn_regester flex  sm:hidden gap-3 ">
              <Link to="/userAccounts" className="signIn">
                <FiUserPlus className="size-5" />
              </Link>
              <button className="regester" onClick={handleLogout}>
                <FaSignInAlt className="size-5" />
              </button>
            </div>
          </div>

          {/* Nav Linkes */}
          <div className="navLinkes flex gap-0  sm:gap-0  ">
            {Linkes.map((link, index) => {
              return (
                <Link
                  to={link.link}
                  key={Linkes + index}
                  className={`hover:text-white hover:cursor-pointer hover:bg-white/20 gap-2 sm:p-5 px-[0.2rem]  
    ${
      currentLocation.pathname === link.link ? "bg-[#858585]/70 text-white" : ""
    }`}
                >
                  <p>{link.title}</p>
                </Link>
              );
            })}
          </div>
          <div className="signIn_regester  sm:flex gap-3 hidden">
            <Link to="/userAccounts" className="signIn">
              <FiUserPlus className="size-5" />
            </Link>
            <button className="regester" onClick={handleLogout}>
              <FaSignInAlt className="size-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}
