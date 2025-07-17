// import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProductesDitales from "./Containers/ProductesDitales.jsx";
import Layout from "./Containers/layout.jsx";
import CartProvider from "./Components/context/cartContext.jsx";
import Cart from "./Containers/Cart.jsx";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";
import CategoryPage from "./Containers/CategoryPage.jsx";
import Favorites from "./Containers/Favorites.jsx";
import SearchResult from "./Components/SearchResult.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <BrowserRouter>
        <Toaster position="bottom-right" reverseOrder={false} />
        {/* cover the pages with animation page loking load */}
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<App />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/search" element={<SearchResult />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="productes/:id" element={<ProductesDitales />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </CartProvider>
  </React.StrictMode>
);
