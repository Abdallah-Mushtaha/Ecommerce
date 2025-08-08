import React, { useEffect, useState } from "react";
import HeroSlider from "../Components/HeroSlider";
import SideProductes from "../Components/sideProductes/slideProductes";
import PageTransitions from "../Components/PageTransitions";
import CheckInternet from "./CheckInternet";

export default function Home() {
  const [error, setError] = useState(false);

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
  const [loadedCategories, setLoadedCategories] = useState([]);
  const [Loading, setLoading] = useState(true);

  // Fetch Data of One Category
  const fetchCategory = async (category) => {
    try {
      // Get from localStorage if found
      const cached = localStorage.getItem(`products_${category}`);
      if (cached) {
        setMyProductes((prev) => ({
          ...prev,
          [category]: JSON.parse(cached),
        }));
        setLoadedCategories((prev) =>
          prev.includes(category) ? prev : [...prev, category]
        );
      }

      // Fetch from API
      const res = await fetch(
        `https://dummyjson.com/products/category/${category}`
      );
      const data = await res.json();

      // Save in State
      setMyProductes((prev) => ({
        ...prev,
        [category]: data.products,
      }));

      // Save in localStorage
      localStorage.setItem(
        `products_${category}`,
        JSON.stringify(data.products)
      );

      // Add to loadedCategories without duplication
      setLoadedCategories((prev) =>
        prev.includes(category) ? prev : [...prev, category]
      );
    } catch (err) {
      console.error("Filed to fetch data :: " + err);
      setError(true);
    }
  };

  // Do Fetching for All Categorys
  useEffect(() => {
    let isMounted = true;

    const loadCategories = async () => {
      // Fetch first 5 categorys to make the page show fast
      const firstBatch = Categorys.slice(0, 5);
      for (let cat of firstBatch) {
        if (!isMounted) return;
        await fetchCategory(cat);
      }
      setLoading(false);

      // Fetch the rest in background
      const rest = Categorys.slice(5);
      for (let cat of rest) {
        if (!isMounted) return;
        await fetchCategory(cat);
      }
    };

    loadCategories();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return <CheckInternet />;
  }

  return (
    <PageTransitions>
      <div>
        <HeroSlider />
        {Loading && loadedCategories.length === 0 ? (
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
          loadedCategories.map((category, index) => (
            <SideProductes
              key={category + index}
              products={MyProductes[category]}
              title={category.replace("-", " ")}
            />
          ))
        )}
      </div>
    </PageTransitions>
  );
}
