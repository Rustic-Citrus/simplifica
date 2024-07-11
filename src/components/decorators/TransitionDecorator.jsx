import PropTypes from "prop-types";

import { motion } from "framer-motion";

export const TransitionDecorator = ({ children }) => {
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

TransitionDecorator.propTypes = {
  children: PropTypes.node,
};
