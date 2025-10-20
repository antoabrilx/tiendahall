// src/styles/PageFade.jsx
import { motion } from "framer-motion";

export default function PageFade({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.25 }}
      style={{ minHeight: "40vh" }}
    >
      {children}
    </motion.div>
  );
}