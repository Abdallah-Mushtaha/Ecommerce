import React, { useState } from "react";
import MobileProductInfo from "./MobileProductInfo";

export default function ProductImg({ items, Loading }) {
  const [ImgIndex, setImgIndex] = useState(0);

  return (
    <div className="imgDev flex flex-col gap-2 px-5 sm:px-0">
      {/* Large Image */}
      {items.images.length < 0 ? (
        <div class="max-w-sm p-4  w-full  rounded  animate-pulse md:p-6 ">
          {/* when  Imag Still loading */}
          <div class="flex items-center justify-center size-72 mb-4 bg-gray-300 rounded-full dark:bg-gray-400">
            <svg
              viewBox="0 0 16 20"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              class="w-10 h-10 text-gray-200 dark:text-gray-600"
            >
              <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"></path>
              <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"></path>
            </svg>
          </div>
        </div>
      ) : (
        <div className="bg_img w-4/3 sm:w-1/2 mb-8 mx-auto bg-bg  flex flex-row gap-2 rounded-3xl">
          <img
            src={
              items.images[ImgIndex] ??
              "https://via.placeholder.com/300x200?text=No+Image"
            }
            alt={items.title}
          />
        </div>
      )}

      {/* Small imgs */}
      <div className="small w-20 sm:w-40  h-auto flex flex-row gap-2 cursor-pointer">
        {items.images.map((img, index) =>
          // if clicked change the main img by index and onClick
          Loading === true ? (
            <div class="max-w-sm p-4  w-full  rounded  animate-pulse md:p-6 ">
              {/* when  Imag Still loading */}
              <div class="flex items-center justify-center size-24 mb-4 bg-gray-300 rounded-full dark:bg-gray-400">
                <svg
                  viewBox="0 0 16 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  class="w-10 h-10 text-gray-200 dark:text-gray-600"
                >
                  <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"></path>
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"></path>
                </svg>
              </div>
            </div>
          ) : (
            <img
              key={index}
              src={img ?? "https://via.placeholder.com/300x200?text=No+Image"}
              alt={items.title}
              onClick={() => {
                setImgIndex(index);
              }}
            />
          )
        )}
      </div>
      {/* Items Ditales Box in Mobile */}
      <MobileProductInfo items={items} />
    </div>
  );
}
