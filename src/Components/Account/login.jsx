import { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "./Auth";
import fakeApi from "./api";

export default function Login({ switchToRegister }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fakeApi({ email, password });
      login(res);

      const hasPendingAction = localStorage.getItem("pendingAction");

      if (hasPendingAction) {
        navigate("/post-login", { replace: true });
      } else {
        const from = location.state?.from?.pathname || "/userAccounts";
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="w-auto max-w-md bg-white p-8 rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Welcome Back 👋
      </h2>

      {error && (
        <p className="text-center text-sm text-red-500 mb-4">{error}</p>
      )}

      <form className="space-y-4" onSubmit={handleForm}>
        <div>
          <label className="block text-sm font-medium text-start text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="mt-1 w-full px-4 py-2  outline-none  border rounded-lg focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none outline-none "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="text-right">
          <button
            type="button"
            className="text-sm text-gray-600 hover:underline"
            onClick={() => navigate("/ForgetPassword")}
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
        <button
          onClick={switchToRegister}
          className="text-main hover:underline"
        >
          Register now
        </button>
      </p>
    </div>
  );
}
