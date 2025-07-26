import React, { useContext, useState } from "react";
import AuthContext from "../Components/Account/Auth";
import { useNavigate } from "react-router-dom";
import { fakeUpdatePassword } from "../Components/Account/api";
import toast from "react-hot-toast";

export default function UserAccount() {
  const { auth, logout, updatePassword } = useContext(AuthContext);
  const [tab, setTab] = useState("profile");
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  if (!auth) {
    navigate("/login");
    return null;
  }

  const { email } = auth.user;

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/userAccounts");
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();

    if (newPass !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    if (auth?.user?.password && current !== auth.user.password) {
      toast.error("Current password is incorrect");
      return;
    }

    const success = fakeUpdatePassword(email, newPass);
    if (success) {
      updatePassword(newPass);
      toast.success("Password updated");
      setCurrent("");
      setNewPass("");
      setConfirm("");
    } else {
      toast.error("Failed to update password");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 mt-40 py-5">
      <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6 border-b pb-6">
          <img
            src={`https://ui-avatars.com/api/?name=${email}&background=random&size=128`}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-4 border-gray-300 shadow-md"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{email}</h2>
            <p className="text-gray-500">Logged in user</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 border-b">
          <nav className="flex gap-6 text-sm font-semibold text-gray-600">
            {["profile", "orders", "password"].map((type) => (
              <button
                key={type}
                onClick={() => setTab(type)}
                className={`pb-3 transition ${
                  tab === type
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "hover:text-blue-500"
                }`}
              >
                {type === "profile"
                  ? "My Info"
                  : type === "orders"
                  ? "My Orders"
                  : "Change Password"}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {tab === "profile" && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                User Information
              </h3>
              <div className="space-y-2 text-gray-600">
                <p>
                  <strong>Email:</strong> {email}
                </p>
              </div>
            </div>
          )}

          {tab === "orders" && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Order History
              </h3>
              <div className="text-gray-500">You have no orders yet.</div>
            </div>
          )}

          {tab === "password" && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Change Password
              </h3>
              <form
                onSubmit={handlePasswordChange}
                className="space-y-4 max-w-md"
              >
                <input
                  type="password"
                  placeholder="Current password"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-100"
                  value={current}
                  onChange={(e) => setCurrent(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="New password"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-100"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-100"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  Save Changes
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Logout */}
        <div className="mt-10 text-right">
          <button
            onClick={handleLogout}
            className="text-red-500 hover:shadow-lg text-sm font-medium border border-red-500 px-4 py-2 rounded-lg transition"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
