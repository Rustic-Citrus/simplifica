import PropTypes from "prop-types";

import { motion } from "framer-motion";

export const ButtonAnimationDecorator = ({ children }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      aria-hidden="true"
    >
      { children }
    </motion.div>
  );
};

ButtonAnimationDecorator.propTypes = {
  children: PropTypes.node
}
