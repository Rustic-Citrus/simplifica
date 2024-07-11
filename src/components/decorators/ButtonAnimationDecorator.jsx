import { motion } from "framer-motion";

export const ButtonAnimationDecorator = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      aria-hidden="true"
    />
  );
};
