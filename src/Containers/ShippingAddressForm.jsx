import { useState, useCallback, useContext, useEffect } from "react";
import { CartContext } from "../Components/context/cartContext";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm() {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useContext(CartContext);
  const [step, setStep] = useState(1);
  const [formErrors, setFormErrors] = useState({});

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    street: "",
    building: "",
    houseNumber: "",
    country: "",
    city: "",
    phone: "",
    email: "",
    paymentMethod: "card",
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
    paypalEmail: "",
    notes: "",
  });

  // get data from local storage on load
  useEffect(() => {
    const savedFormData = localStorage.getItem("checkoutFormData");
    const savedStep = localStorage.getItem("checkoutStep");

    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }

    if (savedStep) {
      setStep(parseInt(savedStep));
    }
  }, []);

  //save data when any changes
  useEffect(() => {
    localStorage.setItem("checkoutFormData", JSON.stringify(formData));
    localStorage.setItem("checkoutStep", step.toString());
  }, [formData, step]);

  const productsTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingFee = formData.country.toLowerCase() === "egypt" ? 50 : 100;
  const totalAmount = productsTotal + shippingFee;

  const validateStep = (currentStep) => {
    const errors = {};
    let isValid = true;

    if (currentStep === 1) {
      const requiredFields = [
        "firstName",
        "lastName",
        "address",
        "street",
        "building",
        "houseNumber",
        "country",
        "city",
        "phone",
        "email",
      ];

      requiredFields.forEach((field) => {
        if (!formData[field]?.trim()) {
          errors[field] = "This field is required";
          isValid = false;
        }
      });

      if (
        formData.email &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      ) {
        errors.email = "Invalid email format";
        isValid = false;
      }
    }

    if (currentStep === 2) {
      if (
        formData.paymentMethod === "paypal" &&
        !formData.paypalEmail?.trim()
      ) {
        errors.paypalEmail = "PayPal email is required";
        isValid = false;
      } else if (formData.paymentMethod === "card") {
        const cardFields = ["cardName", "cardNumber", "cardExpiry", "cardCVC"];
        cardFields.forEach((field) => {
          if (!formData[field]?.trim()) {
            errors[field] = "This field is required";
            isValid = false;
          }
        });
      }
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      if (formErrors[name]) {
        setFormErrors((prev) => ({ ...prev, [name]: "" }));
      }
    },
    [formErrors]
  );

  const handlePaymentSelect = useCallback((method) => {
    setFormData((prev) => ({ ...prev, paymentMethod: method }));
  }, []);

  const nextStep = useCallback(() => {
    if (!validateStep(step)) return;
    setStep((prev) => prev + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, formData]);

  const prevStep = useCallback(() => setStep((prev) => prev - 1), []);

  const confirmOrder = useCallback(() => {
    if (!validateStep(3)) return;

    const fullCheckoutData = {
      formData,
      cartItems,
    };

    localStorage.setItem("checkoutData", JSON.stringify(fullCheckoutData));

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

    const newOrder = {
      id: Date.now(),
      date: new Date().toISOString(),
      formData,
      cartItems,
      total: totalAmount,
    };

    localStorage.setItem(
      "orders",
      JSON.stringify([...existingOrders, newOrder])
    );

    // 🟢 هذا هو السطر الجديد الذي يجب إضافته هنا:
    localStorage.removeItem("orderSaved");

    navigate("/OrderSuccess");
    clearCart();
    localStorage.removeItem("checkoutFormData");
    localStorage.removeItem("checkoutStep");
    setStep(1);
    setFormData({
      firstName: "",
      lastName: "",
      address: "",
      street: "",
      building: "",
      houseNumber: "",
      country: "",
      city: "",
      phone: "",
      email: "",
      paymentMethod: "card",
      cardName: "",
      cardNumber: "",
      cardExpiry: "",
      cardCVC: "",
      paypalEmail: "",
      notes: "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, cartItems]);

  const Input = useCallback(
    ({
      name,
      value,
      onChange,
      placeholder,
      type = "text",
      required = true,
      error,
    }) => (
      <div className="w-full">
        <input
          name={name}
          type={type}
          autoComplete="off"
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          className="w-full p-3 rounded border border-gray-300 hover:border-gray-400 transition"
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    ),
    []
  );

  return (
    <div className="max-w-3xl mx-auto mt-52 px-6 py-8 bg-white shadow-xl rounded-xl space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        ◻️ Checkout-Step {step}
      </h2>

      {/* Step 1: Shipping Info */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
              error={formErrors.firstName}
            />
            <Input
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
              error={formErrors.lastName}
            />
          </div>

          <Input
            name="email"
            placeholder="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            error={formErrors.email}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              name="street"
              placeholder="Street"
              value={formData.street}
              onChange={handleChange}
              required
              error={formErrors.street}
            />
            <Input
              name="building"
              placeholder="Building"
              value={formData.building}
              onChange={handleChange}
              required
              error={formErrors.building}
            />
            <Input
              name="houseNumber"
              placeholder="House Number"
              value={formData.houseNumber}
              onChange={handleChange}
              required
              error={formErrors.houseNumber}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              required
              error={formErrors.country}
            />
            <Input
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
              error={formErrors.city}
            />
            <Input
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
              error={formErrors.phone}
            />
          </div>
          <Input
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
            error={formErrors.address}
          />

          <div className="flex justify-end">
            <button
              onClick={nextStep}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition"
            >
              Continue to Payment →
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Payment Method */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-2">
              Select Payment Method
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["cash", "paypal", "card"].map((method) => (
                <div
                  key={method}
                  onClick={() => handlePaymentSelect(method)}
                  className={`cursor-pointer border rounded-lg px-4 py-3 text-center ${
                    formData.paymentMethod === method
                      ? "border-gray-500 bg-gray-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {method === "card"
                    ? "Credit/Debit Card"
                    : method === "paypal"
                    ? "PayPal"
                    : "Cash on Delivery"}
                </div>
              ))}
            </div>
          </div>

          {formData.paymentMethod === "paypal" && (
            <Input
              name="paypalEmail"
              type="email"
              placeholder="PayPal Email"
              value={formData.paypalEmail}
              onChange={handleChange}
              error={formErrors.paypalEmail}
            />
          )}

          {formData.paymentMethod === "card" && (
            <div className="space-y-4">
              <Input
                name="cardName"
                placeholder="Name on Card"
                value={formData.cardName}
                onChange={handleChange}
                error={formErrors.cardName}
              />
              <Input
                name="cardNumber"
                placeholder="Card Number"
                value={formData.cardNumber}
                onChange={handleChange}
                error={formErrors.cardNumber}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  name="cardExpiry"
                  placeholder="MM/YY"
                  value={formData.cardExpiry}
                  onChange={handleChange}
                  error={formErrors.cardExpiry}
                />
                <Input
                  name="cardCVC"
                  placeholder="CVC"
                  value={formData.cardCVC}
                  onChange={handleChange}
                  error={formErrors.cardCVC}
                />
              </div>
            </div>
          )}

          <div className="flex justify-between">
            <button
              onClick={prevStep}
              className="text-gray-600 hover:underline"
            >
              Back
            </button>
            <button
              onClick={nextStep}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
            >
              Review Order →
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Review & Confirm */}
      {step === 3 && (
        <div className="space-y-8 text-gray-700">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <div className="flex flex-col md:flex-row gap-8 ">
              {/* Shipping Information */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-4 border-b pb-2">
                  🧾 Shipping Information
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <span className="font-medium">Name:</span>{" "}
                    {formData.firstName} {formData.lastName}
                  </li>
                  <li>
                    <span className="font-medium">Address:</span>{" "}
                    {formData.address}, {formData.street}, {formData.building},{" "}
                    {formData.houseNumber}, {formData.city}, {formData.country}
                  </li>
                  <li>
                    <span className="font-medium">Phone:</span> {formData.phone}
                  </li>
                  <li>
                    <span className="font-medium">Email:</span> {formData.email}
                  </li>
                  <li>
                    <span className="font-medium">Payment Method:</span>{" "}
                    {formData.paymentMethod}
                  </li>
                  {formData.paymentMethod === "paypal" && (
                    <li>
                      <span className="font-medium">PayPal:</span>{" "}
                      {formData.paypalEmail}
                    </li>
                  )}
                  {formData.paymentMethod === "card" && (
                    <li>
                      <span className="font-medium">Card:</span> **** **** ****{" "}
                      {formData.cardNumber.slice(-4)}
                    </li>
                  )}
                </ul>
              </div>

              {/* Cart Items */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-4 border-b pb-2">
                  🛒 Cart Items
                </h3>
                <ul className="space-y-2 text-sm text-gray-800">
                  {cartItems.map((item, index) => (
                    <li key={index} className="flex justify-between">
                      <span>
                        {item.title} (x{item.quantity})
                      </span>
                      <span>${item.price * item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Pricing Section */}
            <div className="mt-8 border-t pt-6">
              <div className="flex flex-col   justify-between items-start">
                <div className="flex-1"></div>
                <div className="flex-1 w-full ml-auto">
                  <div className="flex flex-col gap-4 ">
                    <div className="flex justify-between">
                      <div className="text-left">Products Total:</div>
                      <div className="text-right">
                        ${productsTotal.toFixed(2)}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-left">Shipping:</div>
                      <div className="text-right">${shippingFee}</div>
                    </div>
                    <div className="flex justify-between font-semibold text-green-700 text-base pt-2 border-t">
                      <span>💰 Total:</span>
                      <span>${totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4">
            <button
              onClick={prevStep}
              className="text-gray-600 hover:text-gray-600 hover:underline"
            >
              Back
            </button>
            <button
              onClick={confirmOrder}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow"
            >
              Confirm Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
