import React, { useEffect, useState } from "react";
import { BiStoreAlt } from "react-icons/bi";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=100")
      .then((res) => res.json())
      .then((data) => {
        const titles = data.products.map((p) => p.title);

        const words = titles
          .flatMap((title) => title.split(" "))
          .map((w) => w.trim())
          .filter((w) => w.length > 2);

        const unique = [...new Set(words)];
        const topTags = unique.slice(0, 12);
        setTags(topTags);
      });
  }, []);

  const handleClick = (tag) => {
    navigate(`/search?query=${encodeURIComponent(tag)}`);
  };

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=100")
      .then((res) => res.json())
      .then((data) => {
        const titles = data.products.map((p) => p.title);

        const words = titles
          .flatMap((title) => title.split(" "))
          .map((w) => w.trim())
          .filter((w) => w.length > 2);

        const unique = [...new Set(words)];

        const topTags = unique.slice(0, 12);
        setTags(topTags);
      });
  }, []);

  const appButtons = [
    {
      icon: <FaGooglePlay />,
      label: "Get it now",
      store: "Google Play",
      className: "w-72",
    },
    {
      icon: <FaApple />,
      label: "Get it now",
      store: "App Store",
      className: "w-72",
    },
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
  // console.log(categories);
  const Linkes = [
    { title: "Home", link: "/" },
    { title: "About", link: "/about" },
    { title: "Acsessories", link: "/Acsessories" },
    { title: "Blogs", link: "/blog" },
    { title: "Contact", link: "/contact" },
  ];
  return (
    <footer className="bg-gray-200 p-8 text-gray-700 py-[50px] mt-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Contact Information */}
        <div className="space-y-2">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-start sm:gap-2 gap-1 outline-none focus:outline-none"
          >
            <BiStoreAlt
              className="w-10 sm:w-20  text-main size-10 "
              alt="logo.png"
            />
            <h3 className="text-md sm:text-2xl font-bold text-black ">
              {" "}
              Store
            </h3>
          </Link>
          <div className="space-y-1">
            <p>Customer Supports:</p>
            <a href="tel: 20 155 279 8956" className="font-medium">
              tel: 20 155 279 8956
            </a>
          </div>
          <address className="not-italic">
            4517 Washington Ave.
            <br />
            Manchester, Kentucky 39495
          </address>
          {/* Email */}
          <a href="mailto: Eng.Abood.mushtaha@gmail.com">
            {" "}
            Eng.Abood.mushtaha@gmail.com
          </a>
        </div>

        {/* Top Category */}
        <div>
          <h3 className="text-lg font-semibold mb-4">TOP CATEGORY</h3>
          <div className="grid grid-cols-2 gap-2">
            {categories ? (
              categories.map((category) => (
                <Link
                  to={`/category/${category.slug}`}
                  key={category.slug}
                  className="flex flex-col"
                >
                  {/* Display full category name but in two columns layout */}
                  <span className="text-sm truncate" title={category.slug}>
                    {category.slug}
                  </span>
                </Link>
              ))
            ) : (
              <div class="relative flex w-64 animate-pulse gap-2 p-4 bg-gray-300">
                <div class="flex-1">
                  <div class="mb-1 h-5 w-3/5 rounded-lg bg-main text-gray-600 text-lg"></div>
                  <div class="h-5 w-[90%] rounded-lg bg-main text-sm"></div>
                </div>
                <div class="absolute bottom-5 right-0 h-4 w-4 rounded-full bg-main"></div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">QUICK LINKS</h3>
          {/* Nav Linkes */}
          <div className="navLinkes flex flex-col gap-0  sm:gap-0  ">
            {Linkes.map((link, index) => {
              return (
                <Link
                  to={link.link}
                  key={Linkes + index}
                  className={` hover:cursor-pointer gap-[0.1rem] sm:p-[0.5rem] px-[0.2rem]  
       `}
                >
                  <p className="text-sm">{link.title}</p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Download App & Tags */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">DOWNLOAD APP</h3>
            <div className="space-y-3">
              {appButtons.map((btn) => (
                <Link
                  to={
                    btn.store === "Google Play"
                      ? "https://play.google.com/store/apps"
                      : "https://www.apple.com/app-store/"
                  }
                  key={btn.label}
                  target="_blank"
                  className={`flex justify-center items-center gap-4 bg-black text-white px-3 py-2 rounded ${btn.className}`}
                >
                  {btn.icon} {btn.label}{" "}
                  <span className="text-sm">{btn.store}</span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">POPULAR TAG</h3>
            <div className="grid grid-cols-2 gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleClick(tag)}
                  className="bg-gray-300 px-3 py-1 rounded-full text-sm hover:bg-gray-400 transition"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300 mt-8 pt-6 text-center text-sm border-t-1 mx-auto">
        <p>
          Copyright - E-Commerce © {new Date().getFullYear()} Developed by Abood
          Mushtaha{" "}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
