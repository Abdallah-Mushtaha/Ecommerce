import React, { useState } from "react";
import Register from "../Account/Register.jsx";
import Login from "../Account/Login.jsx";
export default function ConficLogin() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="min-h-screen flex items-center justify-center mx-auto  px-4 mt-52 w-1/2">
      <div className="w-full container bg-white shadow-2xl rounded-xl overflow-hidden ">
        {/* Tab Switch */}
        <div className="flex ">
          <button
            to="/login"
            onClick={() => setActiveTab("login")}
            className={`w-1/2 text-center py-3 font-semibold text-sm transition ${
              activeTab === "login"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Login
          </button>

          {/* Register */}
          <button
            to="/register"
            onClick={() => setActiveTab("register")}
            className={`w-1/2 text-center py-3 font-semibold text-sm transition ${
              activeTab === "register"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Register
          </button>
        </div>

        {/* Placeholder for form */}
        <div className="p-6 text-center text-gray-500 text-sm flex flex-col justify-start items-center">
          {activeTab === "login" ? (
            <Login
              switchToRegister={() => setActiveTab("register")}
              switchToLogin={() => setActiveTab("login")}
            />
          ) : (
            <Register switchToLogin={() => setActiveTab("login")} />
          )}
        </div>
      </div>
    </div>
  );
}
