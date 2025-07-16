import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ProductesDitales from "./Containers/ProductesDitales.jsx";
import Layout from "./Containers/layout.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="productes/:id" element={<ProductesDitales />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
