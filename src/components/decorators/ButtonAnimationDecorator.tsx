import { motion } from "framer-motion";
import { ReactNode } from "react";

export const ButtonAnimationDecorator = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      aria-hidden="true"
    >
      {children}
    </motion.div>
  );
};
