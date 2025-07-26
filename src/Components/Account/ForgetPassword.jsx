import React, { useState } from "react";
import { fakeUpdatePassword } from "../Account/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ForgetPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const navigate = useNavigate();

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.find((u) => u.email === email);
    if (!exists) {
      toast.error("Email not found!");
      return;
    }
    setStep(2); // Move to reset password step
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (newPass !== confirmPass) {
      toast.error("Passwords do not match");
      return;
    }

    const success = fakeUpdatePassword(email, newPass);
    if (success) {
      toast.success("Password reset successfully");
      navigate("/login");
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 mt-24">
      <div className="w-full max-w-md bg-gray-100 p-8 rounded-lg shadow-md">
        {step === 1 && (
          <>
            <h2 className="text-lg font-semibold text-center mb-2">
              Forgot Password
            </h2>
            <p className="text-sm text-gray-600 text-center mb-6">
              Enter your email address to reset your password.
            </p>
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md outline-none focus:outline-none "
                placeholder="example@domain.com"
                required
              />
              <button
                type="submit"
                className="w-full bg-gray-500 text-white py-2 rounded-md font-semibold hover:bg-black transition-all"
              >
                Continue
              </button>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-lg font-semibold text-center mb-4">
              Reset Your Password
            </h2>
            <form onSubmit={handleResetPassword} className="space-y-4">
              <input
                type="password"
                placeholder="New password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                className="w-full px-4 py-2 border rounded-md outline-none focus:outline-none "
                required
              />
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                className="w-full px-4 py-2 outline-none focus:outline-none border rounded-md  "
                required
              />
              <button
                type="submit"
                className="w-full bg-gray-600 text-white py-2 rounded-md font-semibold hover:bg-black transition-all"
              >
                Reset Password
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
