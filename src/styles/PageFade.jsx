// src/components/PageFade.jsx
import React from "react";
import { motion } from "framer-motion";

export default function PageFade({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 8, filter: "blur(2px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -8, filter: "blur(2px)" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.main>
  );
}
