import { AiOutlineHeart } from "react-icons/ai";
import { FaStarHalfAlt } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";
import { AiFillStar } from "react-icons/ai";
import useAddToCartOrFav from "../../hooks/useAddToCartOrFav";

// Mobile Prooducts Info rmation
export default function MobileProductInfo({ items }) {
  const { isINCart, isINFav, addToCart, addToFav } = useAddToCartOrFav(items);
  return (
    <div
      className={` container mx-auto  flex flex-col gap-2 justify-center px-5  lg:hidden`}
    >
      <h2 className="text-main font-bold text-md  sm:text-2xl flex flex-row justify-start items-center gap-3 ">
        {items.title}
        <button>
          <AiOutlineHeart
            className={`my-4 rounded-full p-2 size-8 transition ${
              isINFav ? "bg-red-600 text-white" : "bg-main text-white"
            }`}
            onClick={addToFav}
          />
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
        <span className="text-main">
          {items.availabilityStatus ?? "unknown"}
        </span>
      </h6>
      <h6 className="brand font-bold ">
        Brand : <span className="text-main"> {items.brand ?? "unknown"}</span>
      </h6>

      <p className="text-gray-600/70 text-md tracking-tighter line-clamp- sm:w-full ">
        {items.description}
      </p>
      <small className="text-main font-bold  text-lg py-2">
        Hurry Up! Only {items.stock} products left in stock.
      </small>
      <button
        className={`  py-3 font-bold px-3 w-48 rounded-full flex items-center gap-2   hover:shadow-xl shadow-black justify-center my-5 text-center transition-all ${
          isINCart
            ? "bg-black/0 border-2 text-black/90  bg-white  border-black   hover:text-black"
            : "bg-black/100 text-white border-none"
        }`}
        onClick={addToCart}
      >
        {isINCart ? "Done Added" : "Add to Cart"}
        <GiShoppingCart />
      </button>
    </div>
  );
}
