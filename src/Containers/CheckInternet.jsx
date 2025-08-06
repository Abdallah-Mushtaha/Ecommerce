import React from "react";
import img from "../img/ERORR.svg";
import gearO from "../img/gearO.png";
import gearS from "../img/gearS.png";
import gearT from "../img/gearT.png";

export default function CheckInternet() {
  return (
    <div className=" flex items-center justify-center text-gray-600 px-4 mt-52">
      <div className="relative text-center space-y-6 max-w-2xl">
        <div className="relative flex justify-center">
          <img
            src={img}
            alt="No internet available, check the internet"
            className="w-60 relative z-10"
          />

          <img
            src={gearO}
            className="w-12 absolute -top-6 left-1/3 animate-spin-slow"
          />
          <img
            src={gearS}
            className="w-14 absolute -top-4 right-1/3 animate-spin"
          />
          <img
            src={gearS}
            className="w-10 absolute -top-2 left-1/6 animate-spin"
          />
          <img
            src={gearT}
            className="w-11 absolute -top-8 right-1/6 animate-spin-reverse-slow"
          />
        </div>

        <h2 className="text-3xl font-bold">
          No internet available, check the internet
        </h2>
        <p className="text-lg leading-relaxed">
          Oops! Something went wrong. It looks like the page you're looking for
          doesn't exist, the link is broken, or it may have been removed.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-main text-white rounded hover:opacity-80 transition"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
