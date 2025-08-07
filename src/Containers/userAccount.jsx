import React, { useContext, useState, useEffect, useRef } from "react";
import AuthContext from "../Components/Account/Auth";
import { Link, useNavigate } from "react-router";
import { fakeUpdatePassword } from "../Components/Account/api";
import toast from "react-hot-toast";

export default function UserAccount() {
  const { auth, logout, updatePassword } = useContext(AuthContext);
  const [tab, setTab] = useState("profile");
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
  const orders = allOrders.filter((order) => order.email === auth?.user?.email);

  useEffect(() => {
    if (auth?.user?.email) {
      const storedImage = localStorage.getItem(
        `profileImage-${auth.user.email}`
      );
      if (storedImage) {
        // Verify if the stored image is valid
        const img = new Image();
        img.src = storedImage;
        img.onload = () => setProfileImage(storedImage);
        img.onerror = () => setProfileImage("");
      }
    }
  }, [auth?.user?.email]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type and size
      if (!file.type.match("image.*")) {
        toast.error("Please select an image file");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size should be less than 2MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadstart = () => toast.loading("Uploading image...");
      reader.onloadend = () => {
        toast.dismiss();
        const result = reader.result;
        // Verify the image before setting it
        const img = new Image();
        img.src = result;
        img.onload = () => {
          setProfileImage(result);
          localStorage.setItem(`profileImage-${auth.user.email}`, result);
          toast.success("Profile image updated");
        };
        img.onerror = () => {
          toast.error("Invalid image file");
        };
      };
      reader.onerror = () => {
        toast.dismiss();
        toast.error("Error reading image file");
      };
      reader.readAsDataURL(file);
    }
  };

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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-48 mb-20">
      <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-10 border border-gray-100">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6 border-b pb-6">
          <div className="relative group">
            <div className="relative w-32 h-32 min-w-[128px] min-h-[128px]">
              <img
                src={
                  profileImage ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    email
                  )}&background=random&size=256`
                }
                alt="User Avatar"
                className="w-full h-full rounded-full border-4 border-gray-300 shadow-md object-cover"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    email
                  )}&background=random&size=256`;
                }}
              />
              <button
                onClick={() => fileInputRef.current.click()}
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-full transition-all duration-300"
              >
                <span className="opacity-0 group-hover:opacity-100 text-white text-sm font-medium transition-all duration-300">
                  Change
                </span>
              </button>
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">
              {email}
            </h2>
            <p className="text-gray-500">Logged in user</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 border-b">
          <nav className="flex flex-wrap gap-6 text-sm font-semibold text-gray-600">
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
              {orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map((order, index) => (
                    <Link
                      key={index}
                      to="/ViewOrder"
                      state={{ orderr: order }}
                      className="block w-full rounded-2xl border border-gray-200 bg-white p-5 md:p-6 shadow-sm hover:shadow-md transition duration-300 hover:bg-gray-50"
                    >
                      <p className="text-sm text-gray-600">
                        <strong className="text-gray-800">Order ID:</strong>{" "}
                        {order.id}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong className="text-gray-800">Date:</strong>{" "}
                        {order.date}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong className="text-gray-800">Total:</strong> $
                        {order.total}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No orders found.</p>
              )}
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
