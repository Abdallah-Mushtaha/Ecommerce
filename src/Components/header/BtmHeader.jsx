import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";
import { FiUserPlus } from "react-icons/fi";
import { FaSignInAlt } from "react-icons/fa";

export default function BtmHeader() {
  // Also we can hide the categoriesNavList using CSS by clip-path
  const categoresNavList = useRef();
  const currentLocation = useLocation();
  // Array of linkes
  const Linkes = [
    { title: "Home", link: "/" },
    { title: "About", link: "/about" },
    { title: "Acsessories", link: "/Acsessories" },
    { title: "Plogs", link: "/plogs" },
    { title: "Contact", link: "/contact" },
  ];
  // to track categories
  const [categories, setCategories] = useState([]);
  // Fetch categories from api
  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    categoresNavList.current.classList.add("hidden");
  }, [currentLocation.pathname]);

  return (
    <div className="BtmHeader bg-main text-white text-md   ">
      <div className="   flex items-baseline justify-around flex-wrap py-2 sm:py-0">
        {/* Ctegories */}
        <div className="categoresNav flex flex-col ">
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
            className="categoresNavList absolute top-[10rem]  flex flex-col gap-2 max-h-[12rem] overflow-y-scroll bg-gray-100 p-2 hidden text-black z-10   "
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
        <div className="signIn_regester flex gap-3">
          <button className="signIn">
            <FiUserPlus className="size-5" />
          </button>
          <button className="regester">
            <FaSignInAlt className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
