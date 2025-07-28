import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProductesDitales from "./Containers/ProductesDitales.jsx";
import Layout from "./Containers/layout.jsx";
import CartProvider from "./Components/context/cartContext.jsx";
import Cart from "./Containers/Cart.jsx";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";
import CategoryPage from "./Containers/CategoryPage.jsx";
import Favorites from "./Containers/Favorites.jsx";
import SearchResult from "./Components/SearchResult.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import AboutSection from "./Containers/About.jsx";
import ContactUs from "./Containers/ConcatUs.jsx";
import BlogPage from "./Containers/BlogPage.jsx";
import AccessoriesPage from "./Containers/Accessories.jsx";
import ScrollPages from "./Components/sideProductes/ScrollPages.jsx";
import UserAccount from "./Containers/userAccount.jsx";
import Register from "./Components/Account/Register.jsx";
import Login from "./Components/Account/login.jsx";
import ForgetPassword from "./Components/Account/ForgetPassword.jsx";

import { AuthProvider } from "./Components/Account/Auth.jsx";
import ConficLogin from "./Components/Account/ConficLogin.jsx";
import PostLogin from "./Components/PostLogin.jsx";
import ShippingAddressForm from "./Containers/ShippingAddressForm.jsx";
import CheckoutForm from "./Containers/ShippingAddressForm.jsx";
import OrderSuccess from "./Containers/OrderSuccess.jsx";
import ViewOrder from "./Containers/ViewOrder .jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Toaster position="bottom-right" reverseOrder={false} />
          <AnimatePresence mode="wait">
            <ScrollPages>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<App />} />
                  <Route path="/about" element={<AboutSection />} />
                  <Route path="/contact" element={<ContactUs />} />
                  <Route path="/Acsessories" element={<AccessoriesPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/search" element={<SearchResult />} />
                  <Route
                    path="/category/:category"
                    element={<CategoryPage />}
                  />
                  <Route path="/productes/:id" element={<ProductesDitales />} />

                  {/* Pages that require authentication */}
                  <Route
                    path="/cart"
                    element={
                      <ProtectedRoute>
                        <Cart />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/favorites"
                    element={
                      <ProtectedRoute>
                        <Favorites />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/userAccounts"
                    element={
                      <ProtectedRoute>
                        <UserAccount />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/post-login" element={<PostLogin />} />
                  <Route path="/CheckoutForm" element={<CheckoutForm />} />
                  <Route path="/OrderSuccess" element={<OrderSuccess />} />
                  <Route path="/ViewOrder" element={<ViewOrder />} />

                  {/* Auth pages */}
                  <Route path="/ForgetPassword" element={<ForgetPassword />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<ConficLogin />} />

                  {/* fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
              </Routes>
            </ScrollPages>
          </AnimatePresence>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
