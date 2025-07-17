import React, { useEffect, useState } from "react";
import HeroSlider from "../Components/HeroSlider";
import SideProductes from "../Components/sideProductes/slideProductes";
import PageTransitions from "../Components/PageTransitions";

export default function Home() {
  // All Categorys in the site
  const Categorys = [
    "beauty",
    "fragrances",
    "furniture",
    "groceries",
    "home-decoration",
    "kitchen-accessories",
    "laptops",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "mobile-accessories",
    "motorcycle",
    "skin-care",
    "smartphones",
    "sports-accessories",
    "sunglasses",
    "tablets",
    "tops",
    "vehicle",
    "womens-bags",
    "womens-dresses",
    "womens-jewellery",
    "womens-shoes",
    "womens-watches",
  ];
  // Data of Productes
  const [MyProductes, setMyProductes] = useState({});
  const [Loading, setLoading] = useState(true); // do this loading when fetching Data take time some times

  //  Do Fetching of Api Each Category in the categorys
  useEffect(() => {
    const FetchingProductes = async () => {
      try {
        const result = await Promise.all(
          Categorys.map(async (categore) => {
            const response = await fetch(
              `https://dummyjson.com/products/category/${categore}`
            );
            const data = await response.json();
            return { [categore]: data.products };
          })
        );
        //  Saving Data
        const ProductData = Object.assign({}, ...result);
        // now we need put this ProductsData in State to be able to use if some Change detected or not like Editing
        setMyProductes(ProductData);
      } catch (error) {
        console.error("Filed to fetch data :: " + error);
      } finally {
        setLoading(false);
      }
    };

    FetchingProductes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(MyProductes);
  return (
    <PageTransitions>
      <div>
        <HeroSlider />
        {Loading ? (
          <div className="w-screen h-screen flex items-center justify-center">
            <div className="flex flex-row gap-2 ">
              <div className="animate-pulse bg-gray-300 w-14 h-14 rounded-lg"></div>
              <div className="flex flex-col gap-2">
                <div className="animate-pulse bg-gray-300 w-28 h-5 rounded-lg"></div>
                <div className="animate-pulse bg-gray-300 w-36 h-3 rounded-lg"></div>
                <div className="animate-pulse bg-gray-300 w-36 h-2 rounded-lg"></div>
              </div>
            </div>
          </div>
        ) : (
          Categorys.map((categore, index) => {
            // MyProductes[categore] its mean get the data of this categore
            return (
              <SideProductes
                key={categore + index}
                products={MyProductes[categore]}
                title={categore.replace("-", " ")}
              />
            );
          })
        )}
      </div>
    </PageTransitions>
  );
}
