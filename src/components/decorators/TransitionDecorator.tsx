import { motion } from "framer-motion";
import { ReactNode } from "react";

export const TransitionDecorator = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: 0.2,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className="mx-3 my-2"
    >
      {children}
    </motion.div>
  );
};
