import React, { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

export default function CartProvider({ children }) {
  // need use state to check the localStorage if have any items before to set the cartItems else will be an empty array
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });
  // will use useEffect to update the localStorage built apove any changes
  useEffect(() => {
    //    save in local storage the cartItems how add to cart using addCartItem Function
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addCartItem = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addCartItem }}>
      {children}
    </CartContext.Provider>
  );
}
