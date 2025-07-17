import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

//  This Pages will Do  This animation apove whole the pages
// will do animation apove thier childerns
export default function PageTransitions({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
