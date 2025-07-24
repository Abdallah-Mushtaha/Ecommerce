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
import Login from "./Components/Account/Login.jsx";
import ForgetPassword from "./Components/Account/ForgetPassword.jsx";

// ✅ استيراد AuthProvider
import { AuthProvider } from "./Components/Account/Auth.jsx"; // تأكد من المسار الصحيح

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      {" "}
      {/* ✅ لف كل شيء داخل AuthProvider */}
      <CartProvider>
        <BrowserRouter>
          <Toaster position="bottom-right" reverseOrder={false} />
          <AnimatePresence mode="wait">
            <ScrollPages>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route
                    index
                    element={
                      <ProtectedRoute>
                        <App />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/about"
                    element={
                      <ProtectedRoute>
                        <AboutSection />
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
                  <Route
                    path="/ForgetPassword"
                    element={
                      <ProtectedRoute>
                        <ForgetPassword />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/register"
                    element={
                      <ProtectedRoute>
                        <Register />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/login"
                    element={
                      <ProtectedRoute>
                        <Login />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/contact"
                    element={
                      <ProtectedRoute>
                        <ContactUs />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/Acsessories"
                    element={
                      <ProtectedRoute>
                        <AccessoriesPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/blog"
                    element={
                      <ProtectedRoute>
                        <BlogPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/cart"
                    element={
                      <ProtectedRoute>
                        <Cart />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/search"
                    element={
                      <ProtectedRoute>
                        <SearchResult />
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
                    path="/category/:category"
                    element={
                      <ProtectedRoute>
                        <CategoryPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="productes/:id"
                    element={
                      <ProtectedRoute>
                        <ProductesDitales />
                      </ProtectedRoute>
                    }
                  />
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
