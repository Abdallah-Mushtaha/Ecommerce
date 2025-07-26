import React, { createContext, useContext, useEffect, useState } from "react";
import Authcontext from "../Account/Auth";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

export default function CartProvider({ children }) {
  const { auth } = useContext(Authcontext);
  const UserEmail = auth?.user?.email || "";

  useEffect(() => {
    if (UserEmail) {
      const storedCartItems = localStorage.getItem(`cartItems_${UserEmail}`);
      const storedFavoriteItems = localStorage.getItem(
        `favoriteItems_${UserEmail}`
      );

      setCartItems(storedCartItems ? JSON.parse(storedCartItems) : []);
      setFavoriteItems(
        storedFavoriteItems ? JSON.parse(storedFavoriteItems) : []
      );
    } else {
      // Reset cart and favorite items when the user logs out
      setCartItems([]);
      setFavoriteItems([]);
    }
  }, [UserEmail]);

  // ======= Favorite Context =========

  const [favoriteItems, setFavoriteItems] = useState(() => {
    const storeFavoriteItems = localStorage.getItem(
      `favoriteItems_${UserEmail}`
    );
    return storeFavoriteItems ? JSON.parse(storeFavoriteItems) : [];
  });

  // will use useEffect to update the localStorage built apove any changes
  useEffect(() => {
    localStorage.setItem(
      `favoriteItems_${UserEmail}`,
      JSON.stringify(favoriteItems)
    );
  }, [favoriteItems]);

  const addFavoriteItem = (item) => {
    //  will check if the item is already in the favoriteItems or not
    const isItemInFavorite = favoriteItems.some(
      (favoriteItem) => favoriteItem.id === item.id
    );
    if (!isItemInFavorite) {
      setFavoriteItems((prevItems) => [...prevItems, item]);
    }
  };

  const removeFavoriteItem = (id) => {
    setFavoriteItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  //  ======= Cart Conterxt ===========

  // need use state to check the localStorage if have any items before to set the cartItems else will be an empty array
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem(`cartItems_${UserEmail}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });
  // will use useEffect to update the localStorage built apove any changes
  useEffect(() => {
    //    save in local storage the cartItems how add to cart using addCartItem Function
    localStorage.setItem(`cartItems_${UserEmail}`, JSON.stringify(cartItems));
  }, [cartItems]);

  // Increse the quantity of the item  if the id item equal to the id of the item passed to the function will increse the quantity
  const increseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );
  };
  // Decrease the quantity of the item  if the id item equal to the id of the item passed to the function will decrese the quantity
  const decreseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  //  Remove Items from Cart
  const removeCartItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const addCartItem = (item) => {
    setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addCartItem,
        increseQuantity,
        decreseQuantity,
        removeCartItem,
        addFavoriteItem,
        removeFavoriteItem,
        favoriteItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
