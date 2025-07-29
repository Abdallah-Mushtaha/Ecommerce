import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import { ShoppingBag, Calendar, Truck, Home } from "react-feather";
import html2pdf from "html2pdf.js";

export default function ViewOrder() {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderr } = location.state || {};
  const printRef = useRef();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (orderr) {
      const productsTotal = orderr.cartItems.reduce(
        (sum, item) => sum + item.price * (item.quantity || 1),
        0
      );

      const shippingFee =
        orderr.formData?.country?.toLowerCase() === "egypt" ? 50 : 100;

      const transformedOrder = {
        id: `#ORD-${orderr.id.toString().slice(-6)}`,
        date: new Date(orderr.date).toLocaleDateString("en-GB"),
        status: "Processing",
        items: orderr.cartItems,
        shippingAddress: `${orderr.formData.address}, ${orderr.formData.street}, ${orderr.formData.building}, ${orderr.formData.houseNumber}, ${orderr.formData.city}, ${orderr.formData.country}`,
        paymentMethod: orderr.formData.paymentMethod,
        email: orderr.formData.email,
        phone: orderr.formData.phone,
        trackingNumber: `TRK-${Math.floor(Math.random() * 1000000)}`,
        total: orderr.total,
        productsTotal,
        shippingFee,
      };

      setOrder(transformedOrder);

      // 🟢 نحذف العلامة حتى لا تمنع حفظ الطلب التالي
      localStorage.removeItem("orderSaved");

      return;
    }

    const checkoutData = JSON.parse(localStorage.getItem("checkoutData"));
    if (!checkoutData) {
      navigate("/userAccounts");
      return;
    }

    const formData = checkoutData.formData;
    const storedItems = checkoutData.cartItems;

    if (!formData || !storedItems) {
      navigate("/ViewOrder");
      return;
    }

    const productsTotal = storedItems.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );

    const shippingFee = formData.country?.toLowerCase() === "egypt" ? 50 : 100;

    const newOrder = {
      id: Date.now(),
      date: new Date().toISOString(),
      formData,
      cartItems: storedItems,
      total: productsTotal + shippingFee,
    };

    const alreadySaved = localStorage.getItem("orderSaved");

    if (!alreadySaved) {
      const previousOrders = JSON.parse(localStorage.getItem("orders")) || [];
      localStorage.setItem(
        "orders",
        JSON.stringify([...previousOrders, newOrder])
      );
      localStorage.setItem("orderSaved", "true");
    }

    const transformedOrder = {
      id: `#ORD-${newOrder.id.toString().slice(-6)}`,
      date: new Date(newOrder.date).toLocaleDateString("en-GB"),
      status: "Processing",
      items: storedItems,
      shippingAddress: `${formData.address}, ${formData.street}, ${formData.building}, ${formData.houseNumber}, ${formData.city}, ${formData.country}`,
      paymentMethod: formData.paymentMethod,
      email: formData.email,
      phone: formData.phone,
      trackingNumber: `TRK-${Math.floor(Math.random() * 1000000)}`,
      total: productsTotal + shippingFee,
      productsTotal,
      shippingFee,
    };

    setOrder(transformedOrder);
  }, [orderr, navigate]);

  const handleDownloadPDF = () => {
    const element = printRef.current;
    const opt = {
      margin: 0.5,
      filename: `${order.id}_invoice.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading order...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-52">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8 print:hidden">
          <h1 className="text-2xl font-bold text-gray-800">🧾 Order Summary</h1>
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-gray-600 hover:underline"
          >
            <Home className="mr-1" size={18} />
            Back to Home
          </button>
        </div>

        <div ref={printRef} className="bg-white shadow rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-700 mb-6">
            <div className="flex items-center">
              <ShoppingBag className="mr-2 text-gray-500" />
              <div>
                <p className="text-gray-500">Order ID</p>
                <p className="font-semibold">{order.id}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2 text-gray-500" />
              <div>
                <p className="text-gray-500">Date</p>
                <p className="font-semibold">{order.date}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Truck className="mr-2 text-gray-500" />
              <div>
                <p className="text-gray-500">Status</p>
                <p className="font-semibold text-yellow-600">{order.status}</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold border-b pb-2 mb-4">
              🛍️ Items
            </h2>
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center py-2 border-b last:border-none"
              >
                <div>
                  <p className="font-medium">
                    {item.title} x{item.quantity}
                  </p>
                </div>
                <div>{(item.price * item.quantity).toFixed(2)} EGP</div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 text-sm">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>{order.productsTotal.toFixed(2)} EGP</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>{order.shippingFee.toFixed(2)} EGP</span>
            </div>
            <div className="flex justify-between font-bold text-base text-green-600">
              <span>Total</span>
              <span>{order.total.toFixed(2)} EGP</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4 print:hidden">
          <button
            onClick={handleDownloadPDF}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          >
            🖨️ Print Invoice
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-all"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
