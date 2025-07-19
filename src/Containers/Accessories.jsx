import React, { useEffect, useState } from "react";
import Productes from "../Components/sideProductes/Productes";

const Accessories = () => {
  const [accessories, setAccessories] = useState([]);
  const [loading, setLoading] = useState(true);

  const accessoryCategories = [
    "mens-watches",
    "womens-watches",
    "womens-jewellery",
    "sunglasses",
  ];

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        let allProducts = [];
        for (const category of accessoryCategories) {
          const res = await fetch(
            `https://dummyjson.com/products/category/${category}`
          );
          const data = await res.json();
          allProducts = [...allProducts, ...data.products];
        }
        setAccessories(allProducts);
      } catch (error) {
        console.error("Error fetching accessories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAccessories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading)
    return (
      <div className="text-center mt-10 text-xl">
        <div class="relative flex w-64 animate-pulse gap-2 p-4">
          <div class="h-12 w-12 rounded-full bg-slate-400"></div>
          <div class="flex-1">
            <div class="mb-1 h-5 w-3/5 rounded-lg bg-slate-400 text-lg"></div>
            <div class="h-5 w-[90%] rounded-lg bg-slate-400 text-sm"></div>
          </div>
          <div class="absolute bottom-5 right-0 h-4 w-4 rounded-full bg-slate-400"></div>
        </div>
      </div>
    );

  return (
    <div className="grid grid-cols-1 container mx-auto sm:grid-cols-2 md:grid-cols-3 gap-6 p-6  min-h-screen mt-40">
      {accessories.map((item) => (
        <Productes key={item.id} item={item} />
      ))}
    </div>
  );
};

export default Accessories;
