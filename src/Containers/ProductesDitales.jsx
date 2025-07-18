import React, { useEffect, useState } from "react";
import { FaStarHalfAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { GiShoppingCart } from "react-icons/gi";
import { AiOutlineHeart } from "react-icons/ai";
import SlideProductes from "../Components/sideProductes/slideProductes";
import ProductInfo from "../Components/sideProductes/ProductInfo";
import MobileProductInfo from "../Components/sideProductes/MobileProductInfo";
import ProductImg from "../Components/sideProductes/ProductImg";
import PageTransitions from "../Components/PageTransitions";

export default function ProductesDitales() {
  const { id } = useParams();
  // console.log(id);

  const [iteme, setiteme] = useState({});
  const [Loading, setLoading] = useState(true);

  const [RelationProduct, setRelationProduct] = useState([]);
  const [LoadingRelationProduct, setLoadingRelationProduct] = useState(true);

  // console.log(RelationProduct);

  //  get the data of all products that have the same category
  useEffect(() => {
    const repo = async () => {
      if (!iteme) return;
      try {
        const res = await fetch(
          `https://dummyjson.com/products/category/${iteme.category}`
        );
        const data = await res.json();
        setRelationProduct(data.products);
        setLoadingRelationProduct(false);
      } catch (error) {
        console.log("Filed to fetch data :: " + error);
      }
    };
    repo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iteme.category]);

  // Fetching iteme Data wich user click on
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setiteme(data);
        setLoading(false);
      } catch (error) {
        console.log("Filed to fetch data :: " + error);
      }
    };
    fetchData();
  }, [id]);

  // console.log(iteme);

  return (
    <>
      <PageTransitions key={iteme.id}>
        {Loading ? (
          <div className="flex flex-row w-screen h-screen  gap-2 justify-center items-center  mt-5">
            <div className="animate-pulse bg-gray-300 w-14 h-14 rounded-lg"></div>
            <div className="flex flex-col gap-2">
              <div className="animate-pulse bg-gray-300 w-28 h-5 rounded-lg"></div>
              <div className="animate-pulse bg-gray-300 w-36 h-3 rounded-lg"></div>
              <div className="animate-pulse bg-gray-300 w-36 h-2 rounded-lg"></div>
            </div>
          </div>
        ) : (
          //  This Div need Refactor To Be best Practeses
          <div className="hero container mx-auto mt-[4.5rem] flex flex-row gap-5 pt-52">
            {/* imgDev */}
            <ProductImg items={iteme} Loading={Loading} />
            {/* Items Ditales Box in Disktop  */}
            <ProductInfo items={iteme} />
          </div>
        )}
        ;{/* Display the Related Products or Similar Products  */}
        {LoadingRelationProduct ? (
          "Loading..."
        ) : (
          <SlideProductes products={RelationProduct} title={iteme.category} />
        )}
      </PageTransitions>
    </>
  );
}
