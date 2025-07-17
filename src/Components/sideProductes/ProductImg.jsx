import React, { useState } from "react";
import MobileProductInfo from "./MobileProductInfo";

export default function ProductImg({ items }) {
  const [ImgIndex, setImgIndex] = useState(0);

  return (
    <div className="imgDev flex flex-col gap-2 px-5 sm:px-0">
      <div className="bg_img w-4/3 sm:w-1/2 mb-8 mx-auto bg-bg  flex flex-row gap-2 rounded-3xl">
        <img
          src={
            items.images[ImgIndex] ??
            "https://via.placeholder.com/300x200?text=No+Image"
          }
          alt={items.title}
        />
      </div>
      {/* Small imgs */}
      <div className="small w-20 sm:w-40  h-auto flex flex-row gap-2 cursor-pointer">
        {items.images.map((img, index) => (
          // if clicked change the main img by index and onClick
          <img
            key={index}
            src={img ?? "https://via.placeholder.com/300x200?text=No+Image"}
            alt={items.title}
            onClick={() => {
              setImgIndex(index);
            }}
          />
        ))}
      </div>
      {/* Items Ditales Box in Mobile */}
      <MobileProductInfo items={items} />
    </div>
  );
}
