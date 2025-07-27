// src/pages/PostLogin.jsx
import { useContext, useEffect } from "react";
import { CartContext } from "../Components/context/cartContext";
import Authcontext from "../Components/Account/Auth";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export default function PostLogin() {
  const { addCartItem, addFavoriteItem } = useContext(CartContext);
  const { auth } = useContext(Authcontext);
  const navigate = useNavigate();

  useEffect(() => {
    const pending = localStorage.getItem("pendingAction");
    if (auth && pending) {
      try {
        const { type, item } = JSON.parse(pending);
        if (type === "cart") {
          addCartItem(item);
          toast.success(`${item.title} added to cart`);
        } else if (type === "Favorite") {
          addFavoriteItem(item);
          toast.success(`${item.title} added to Favorite`);
        }
      } catch (err) {
        console.error("Error handling pending action:", err);
      }
      localStorage.removeItem("pendingAction");
    }

    navigate("/", { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return null;
}
