import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Productes from "../Components/sideProductes/Productes";
import PageTransitions from "../Components/PageTransitions";

export default function CategoryPage() {
  const category = useParams();
  //   console.log(category);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetching = async () => {
      try {
        const res = await fetch(
          `https://dummyjson.com/products/category/${category.category}`
        );
        const data = await res.json();
        // console.log(data);
        setProducts(data.products);
      } catch (error) {
        console.log("Filed to fetch data :: " + error);
      }
    };
    fetching();
  }, [category]);
  //   console.log(products);

  return (
    <PageTransitions>
      <div
        className="cart mt-40 sm:mt-52 
      mx-auto  py-5 container rounded-md  mb-10 "
      >
        {/* top slide header */}
        <div
          className="topSlide relative mb-5 p-[0.9rem] pb-2 border-b-2  border-border 
  after:content-[''] after:absolute after:-bottom-[1px] after:left-0 
  after:w-[100px] after:h-[2px] after:bg-main"
        >
          <h2 className="text-2xl font-bold capitalize text-main">
            {category.category}
          </h2>
          <h3 className="mb-2 py-2">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet,
            rerum.
          </h3>
        </div>

        <div className="flex  flex-wrap items-center gap-4  justify-start">
          {products.map((item) => (
            <div className="w-[15rem] h-30">
              <Productes item={item} />
            </div>
          ))}
        </div>
      </div>
    </PageTransitions>
  );
}
