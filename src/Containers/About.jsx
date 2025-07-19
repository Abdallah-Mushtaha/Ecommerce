import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const aboutContent = [
  {
    title: "Who We Are",
    description:
      "At our store, we believe in delivering the best online shopping experience through high-quality products and exceptional customer service.",
  },
  {
    title: "Our Vision",
    description:
      "To be the first choice for customers in e-commerce by focusing on innovation, quality, and reliability.",
  },
  {
    title: "Our Mission",
    description:
      "To provide unique products that meet our customers' needs while ensuring a smooth and secure shopping experience.",
  },
  {
    title: "Our Values",
    description:
      "Transparency, quality, excellence, and commitment to customer service.",
  },
];

const AboutSection = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 mt-40">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-center mb-12 text-gray-800"
      >
        About Us
      </motion.h2>

      <div className="space-y-10">
        {aboutContent.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-white p-6 md:p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
          >
            <h3 className="text-2xl font-semibold text-gray-600 mb-3">
              {section.title}
            </h3>
            <p className="text-gray-400 leading-relaxed text-base md:text-lg">
              {section.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AboutSection;
