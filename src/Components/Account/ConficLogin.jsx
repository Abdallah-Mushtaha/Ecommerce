import React, { useState } from "react";
import Register from "../Account/Register.jsx";
import Login from "../Account/login.jsx";

export default function ConficLogin() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="min-h-screen flex items-center justify-center px-4 mt-52">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-xl overflow-hidden">
        {/* Tab Switch */}
        <div className="flex">
          <button
            onClick={() => setActiveTab("login")}
            className={`w-1/2 text-center py-3 font-semibold text-sm transition ${
              activeTab === "login"
                ? "bg-main text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setActiveTab("register")}
            className={`w-1/2 text-center py-3 font-semibold text-sm transition ${
              activeTab === "register"
                ? "bg-main text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Register
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6">
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
