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
  console.log(categories);

  return (
    <footer className="bg-gray-200 p-8 text-gray-700 py-[50px]">
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
            <a href="tel:(629) 555-0129" className="font-medium">
              (629) 555-0129
            </a>
          </div>
          <address className="not-italic">
            4517 Washington Ave.
            <br />
            Manchester, Kentucky 39495
          </address>
          {/* Email */}
          <a href="email:Example@gmail.com">Example@gmail.com</a>
        </div>

        {/* Top Category */}
        <div>
          <h3 className="text-lg font-semibold mb-4">TOP CATEGORY</h3>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((category) => (
              <Link
                to={`/category/${category.slug}`}
                key={category}
                className="flex flex-col"
              >
                {/* Display full category name but in two columns layout */}
                <span className="text-sm truncate" title={category.slug}>
                  {category.slug}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">QUICK LINKS</h3>
          <ul className="space-y-2">
            {[
              "Shop Product",
              "Shaping Cart",
              "Wishlist",
              "Compare",
              "Track Order",
              "Customer Help",
              "About Us",
            ].map((item) => (
              <Link to={`/${item}`} key={item} className="flex flex-col ">
                {item}
              </Link>
            ))}
          </ul>
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
