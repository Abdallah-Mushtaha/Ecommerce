import { useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Components/context/cartContext";

export default function useAddToCartOrFav(item) {
  const {
    cartItems,
    favoriteItems,
    addCartItem,
    removeCartItem,
    addFavoriteItem,
    removeFavoriteItem,
  } = useContext(CartContext);

  const navigate = useNavigate();

  const isINCart = cartItems.some((cartitem) => cartitem.id === item.id);
  const isINFav = favoriteItems.some((favorite) => favorite.id === item.id);

  const addToCart = () => {
    if (isINCart) {
      removeCartItem(item.id);
    } else {
      const result = addCartItem(item);
      if (!result) {
        localStorage.setItem(
          "pendingAction",
          JSON.stringify({ type: "cart", item })
        );
        navigate("/login");
        return false;
      }
      toast.success(`${item.title} Added To Cart`);
    }
    return true;
  };

  const addToFav = () => {
    if (isINFav) {
      removeFavoriteItem(item.id);
    } else {
      const result = addFavoriteItem(item);
      if (!result) {
        localStorage.setItem(
          "pendingAction",
          JSON.stringify({ type: "favorite", item })
        );
        navigate("/login");
        return false;
      }
      toast.success(`${item.title} Added To Favorite`);
    }
    return true;
  };

  return { isINCart, isINFav, addToCart, addToFav };
}
