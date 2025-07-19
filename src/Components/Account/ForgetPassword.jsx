import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sending code to:", email);
    // TODO: Send API call here
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4 mt-24">
      <div className="w-full max-w-md bg-gray-100 p-8 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-center mb-2">
          Forget Password
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter the email address or mobile phone number associated with your
          Clicon account.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="example@domain.com"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold flex items-center justify-center hover:bg-blue-600 transition"
          >
            SEND CODE <span className="ml-2">→</span>
          </button>
        </form>

        <hr className="my-4" />

        <p className="text-xs text-center text-gray-500">
          You may contact{" "}
          <a href="#" className="text-black hover:underline">
            Customer Service
          </a>{" "}
          for help restoring access to your account.
        </p>
      </div>
    </div>
  );
}
