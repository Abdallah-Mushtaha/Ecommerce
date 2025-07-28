import React from "react";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex  items-center justify-center mt-52 w-screen  py-10">
      <div className="max-w-md w-full p-8 rounded-lg flex flex-col justify-center items-center text-center">
        <div className="mb-6">
          <svg
            className="w-20 h-20 mx-auto text-green-500 border border-green-500 rounded-full p-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Your order is successfully placed
        </h2>

        <p className="text-gray-600 mb-2 ">
          Pellentesque sed lectus nec tortor tristique accumsan quis
        </p>
        <p className="text-gray-600 mb-8">
          dictum risus. Donec volutpat mollis nulla non facilisis.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
          >
            GO TO DASHBOARD
          </button>
          <button
            onClick={() => navigate("/ViewOrder")}
            className="px-6 py-2 border border-gray-800 text-gray-800 rounded hover:bg-gray-100 transition"
          >
            VIEW ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
