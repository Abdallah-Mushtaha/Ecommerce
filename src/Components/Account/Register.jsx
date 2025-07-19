import React from "react";
import { Link } from "react-router-dom";

export default function Register({ switchToLogin }) {
  return (
    <div className="w-full max-w-md bg-white p-8 rounded-xl  ">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Create an Account 🚀
      </h2>
      <form className="space-y-4 ">
        <div>
          <label className="block text-sm font-medium text-start text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            placeholder="John Doe"
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-start font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-start font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Already have an account?{" "}
        <a onClick={switchToLogin} className="text-blue-600 hover:underline">
          Login
        </a>
      </p>
    </div>
  );
}
