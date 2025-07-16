import React, { useEffect, useState } from "react";
import { FaStarHalfAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { GiShoppingCart } from "react-icons/gi";
import { AiOutlineHeart } from "react-icons/ai";
import SlideProductes from "../Components/sideProductes/slideProductes";

export default function ProductesDitales() {
  const { id } = useParams();
  console.log(id);

  const [ImgIndex, setImgIndex] = useState(0);
  const [iteme, setiteme] = useState({});
  const [Loading, setLoading] = useState(true);

  const [RelationProduct, setRelationProduct] = useState([]);
  const [LoadingRelationProduct, setLoadingRelationProduct] = useState(true);

  console.log(RelationProduct);

  //  get the data of all products that have the same category
  useEffect(() => {
    const repo = async () => {
      try {
        const res = await fetch(
          `https://dummyjson.com/products/category/${iteme.category}`
        );
        const data = await res.json();
        setRelationProduct(data.products);
        setLoadingRelationProduct(false);
      } catch (error) {
        console.log("Filed to fetch data :: " + error);
      }
    };
    repo();
  }, [iteme.category]);

  // Fetching iteme Data wich user click on
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setiteme(data);
        setLoading(false);
      } catch (error) {
        console.log("Filed to fetch data :: " + error);
      }
    };
    fetchData();
  }, [id]);

  console.log(iteme);

  return (
    <>
      {Loading ? (
        <div className="flex flex-row w-screen h-screen  gap-2 justify-center items-center  mt-5">
          <div className="animate-pulse bg-gray-300 w-14 h-14 rounded-lg"></div>
          <div className="flex flex-col gap-2">
            <div className="animate-pulse bg-gray-300 w-28 h-5 rounded-lg"></div>
            <div className="animate-pulse bg-gray-300 w-36 h-3 rounded-lg"></div>
            <div className="animate-pulse bg-gray-300 w-36 h-2 rounded-lg"></div>
          </div>
        </div>
      ) : (
        <div className="hero container mx-auto mt-[4.5rem] flex flex-row gap-5 ">
          {/* imgDev */}
          <div className="imgDev flex flex-col gap-2 px-5 sm:px-0">
            <div className="bg_img w-5/6 mx-auto bg-bg  flex flex-row gap-2 rounded-3xl">
              <img src={iteme.images[ImgIndex]} alt={iteme.title} />
            </div>
            {/* Small imgs */}
            <div className="small w-20 sm:w-40  h-auto flex flex-row gap-2 cursor-pointer">
              {iteme.images.map((img, index) => (
                // if clicked change the main img by index and onClick
                <img
                  key={index}
                  src={img}
                  alt={iteme.title}
                  onClick={() => {
                    setImgIndex(index);
                  }}
                />
              ))}
            </div>
            {/* Items Ditales Box in Mobile */}
            <div className=" container mx-auto flex flex-col gap-2 justify-center px-5  sm:hidden">
              <h2 className="text-main font-bold text-md  sm:text-2xl flex flex-row justify-start items-center gap-3 ">
                {iteme.title}
                <button>
                  <AiOutlineHeart className="my-4 text-black bg-gray-300 rounded-full p-2 size-8 hover:bg-red-600 transition hover:text-white" />
                </button>
              </h2>
              <div className="stars flex  text-yellow-500 py-2">
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <FaStarHalfAlt />
              </div>
              <small className="price text-black fw-bold text-sm sm:text-lg">
                ${iteme.price}
              </small>
              <h6 className="availabilityStatus font-bold">
                availability :{" "}
                <span className="text-main">
                  {iteme.availabilityStatus ?? "unknown"}
                </span>
              </h6>
              <h6 className="brand font-bold ">
                Brand :{" "}
                <span className="text-main"> {iteme.brand ?? "unknown"}</span>
              </h6>

              <p className="text-gray-600/70 text-md tracking-tighter line-clamp- sm:w-full ">
                {iteme.description}
              </p>
              <small className="text-main fw-bold  text-lg py-2">
                Hurry Up! Only {iteme.stock} products left in stock.
              </small>
              <button className="bg-main/80 transition text-white py-2 fw-bold px-3 rounded-full flex items-center gap-2 hover:bg-main justify-center my-5 text-center">
                Add to Cart
                <GiShoppingCart />
              </button>
            </div>
          </div>
          {/* Items Ditales Box in Disktop  */}
          <div className="itemDitales flex flex-col gap-2 justify-start sm:pt-10 items-start">
            <div className="hidden sm:block">
              <h2 className="text-main font-bold text-md  sm:text-2xl flex flex-row justify-start items-center gap-10 ">
                {iteme.title}
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
              <small className="price text-black fw-bold text-sm sm:text-lg">
                ${iteme.price}
              </small>
              <h6 className="availabilityStatus font-bold">
                availability :{" "}
                <span className="text-main">{iteme.availabilityStatus}</span>
              </h6>
              <h6 className="brand font-bold ">
                Brand : <span className="text-main"> {iteme.brand}</span>
              </h6>

              <p className="text-gray-600/70 text-md tracking-tighter line-clamp- sm:w-full ">
                {iteme.description}
              </p>
              <small className="text-main fw-bold  text-lg py-2">
                Hurry Up! Only {iteme.stock} products left in stock.
              </small>
              <button className="bg-main/80 transition text-white py-2 fw-bold px-3 rounded-full flex items-center gap-2 hover:bg-main justify-center my-5 text-center">
                Add to Cart
                <GiShoppingCart />
              </button>
            </div>
          </div>
        </div>
      )}
      ;{/* Display the Related Products or Similar Products  */}
      {LoadingRelationProduct ? (
        "Loading..."
      ) : (
        <SlideProductes products={RelationProduct} title={iteme.category} />
      )}
    </>
  );
}
