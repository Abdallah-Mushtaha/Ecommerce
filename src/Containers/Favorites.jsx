import React, { useContext } from "react";
import { CartContext } from "../Components/context/cartContext";
import SlideProductes from "../Components/sideProductes/SlideProductes";

export default function Favorites() {
  //  will get the cart items from the context
  const { favoriteItems } = useContext(CartContext);
  return (
    <div
      className="cart mt-40 sm:mt-52 
     h-auto w-50  mx-auto px-10 py-5 container rounded-md  mb-10 flex flex-col flex-start "
    >
      {favoriteItems.length > 0 ? (
        <SlideProductes title="Faivorites" products={favoriteItems} />
      ) : (
        <h1 className="text-3xl font-semibold text-center text-gray-500/80 mt-56  flex justify-center items-center">
          No Favorite Items Found
        </h1>
      )}
    </div>
  );
}
