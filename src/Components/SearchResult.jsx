import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PageTransitions from "./PageTransitions";
import Productes from "./sideProductes/Productes";

export default function SearchResult() {
  const SearchKeyWord = new URLSearchParams(useLocation().search).get("query");
  //   console.log(SearchKeyWord);

  const [SearchResult, setSearchResult] = useState([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${SearchKeyWord}`
        );
        const data = await res.json();
        setSearchResult(data.products || []);
        console.log(data.products);
      } catch (error) {
        console.log("Filed to fetch data :: " + error);
      } finally {
        setLoading(false);
      }
    };
    if (SearchKeyWord) fetchResult();
  }, [SearchKeyWord]);

  return (
    <PageTransitions>
      {Loading ? (
        <div className="flex flex-row w-screen h-screen  gap-2 justify-center items-center  mt-5">
          <div className="animate-pulse bg-gray-300 w-14 h-14 rounded-lg"></div>
          <div className="flex flex-col gap-2">
            <div className="animate-pulse bg-gray-300 w-28 h-5 rounded-lg"></div>
            <div className="animate-pulse bg-gray-300 w-36 h-3 rounded-lg"></div>
            <div className="animate-pulse bg-gray-300 w-36 h-2 rounded-lg"></div>
          </div>
        </div>
      ) : SearchResult.length === 0 ? (
        <div className="flex flex-row w-screen h-screen  gap-2 justify-center items-center  mt-5">
          <h1 className="text-2xl text-gray-400 font-bold">No Result Found</h1>
        </div>
      ) : SearchResult.length < 0 ? (
        " "
      ) : (
        <div
          className="cart mt-40 sm:mt-52 
          mx-auto  py-5 container rounded-md transition-all  mb-10 "
        >
          {/* top slide header */}
          <div
            className="topSlide relative mb-5 p-[0.9rem] pb-2 border-b-2  border-border 
      after:content-[''] after:absolute after:-bottom-[1px] after:left-0 
      after:w-[100px] after:h-[2px] after:bg-main"
          >
            <h2 className="text-2xl font-bold capitalize text-main">
              Search About : {SearchKeyWord}
            </h2>
          </div>

          <div className="flex  flex-wrap items-center gap-4  justify-start">
            {SearchResult.map((item) => (
              <div className="sm:w-[15rem] w-[19rem] sm:h-30 mx-auto">
                <Productes item={item} />
              </div>
            ))}
          </div>
        </div>
      )}
    </PageTransitions>
  );
}
