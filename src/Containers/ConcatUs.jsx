import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const ContactUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name) errs.name = "Required";
    if (!form.email.match(/^\S+@\S+\.\S+$/)) errs.email = "Invalid email";
    if (!form.message) errs.message = "Required";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      console.log("Sending form", form);
      // integrate with your API or form service here
      alert("Your message has been sent!");
      setForm({ name: "", email: "", subject: "", message: "" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row container mx-auto   mt-40 ">
      {/* Left Side – Brand Info */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="md:flex-1 bg-white p-12 flex flex-col justify-center"
      >
        <h2 className="text-4xl font-bold text-black mb-4">Get in Touch</h2>
        <p className="text-gray-700 mb-8">
          Have questions about our products? We're here to help.
        </p>
        <ul className="space-y-4 text-gray-600">
          <li>
            <strong>Email:</strong> support@ourstore.com
          </li>
          <li>
            <strong>Phone:</strong> +1 234 567 890
          </li>
          <li>
            <strong>Address:</strong> 123 Commerce St, Shopville, USA
          </li>
        </ul>
        <p className="mt-8 text-sm text-gray-500">
          We reply within 24 hours. You can also visit our FAQ or start a live
          chat.
        </p>
      </motion.div>

      {/* Right Side – Form */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="md:flex-1 p-12"
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-8 rounded-xl shadow-lg shadow-gray-400"
        >
          {["name", "email", "subject", "message"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              {field !== "message" ? (
                <input
                  type={field === "email" ? "email" : "text"}
                  className={`mt-1 block w-full border rounded-md p-2 ${
                    errors[field] ? "border-red-500" : "border-gray-300"
                  }`}
                  value={form[field]}
                  onChange={(e) =>
                    setForm({ ...form, [field]: e.target.value })
                  }
                />
              ) : (
                <textarea
                  rows="4"
                  className={`mt-1 block w-full border rounded-md p-2 resize-none ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  }`}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                />
              )}
              {errors[field] && (
                <p className="text-sm text-red-600 mt-1">{errors[field]}</p>
              )}
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-black/70 hover:bg-black/100 text-white py-3 rounded-md transition-all duration-300"
          >
            Send Message
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ContactUs;
