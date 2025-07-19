import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ switchToRegister }) {
  const navigate = useNavigate();

  const handleForm = (e) => {
    e.preventDefault();

    console.log("Login form submitted");
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Welcome Back 👋
      </h2>

      <form className="space-y-4" onSubmit={handleForm}>
        <div>
          <label className="block text-sm font-medium text-start text-gray-700">
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
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
        </div>

        <div className="text-right">
          <button
            type="button"
            className="text-sm text-gray-600 hover:underline"
            onClick={() => {
              navigate("/ForgetPassword");
            }}
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-main transition"
        >
          Sign In
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Don’t have an account?{" "}
        <a onClick={switchToRegister} className="text-main hover:underline">
          Register now
        </a>
      </p>
    </div>
  );
}
