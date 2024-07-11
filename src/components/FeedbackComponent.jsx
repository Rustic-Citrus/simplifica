import PropTypes from "prop-types";

import Toast from "react-bootstrap/Toast";

import { motion } from "framer-motion";

export const FeedbackComponent = ({ title, message, type, toggleVisible }) => {
  const date = new Date();

  return (
    <motion.div
      drag
      dragConstraints={{
        top: 0,
        left: -50,
        right: 0,
        bottom: 50,
      }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          delay: 0.2,
        },
      }}
      exit={{ opacity: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.5 }}
      className="my-1"
    >
      <Toast
        onClose={toggleVisible}
        delay={5000}
        bg={type === "error" ? "warning" : type}
        autohide={true}
      >
        <Toast.Header>
          <strong className="me-auto" aria-label="feedback-title">
            {title}
          </strong>
          <small aria-label="feedback-timestamp">
            {date.toLocaleTimeString()}
          </small>
        </Toast.Header>
        <Toast.Body
          className={type === "error" ? "text-grey" : "text-white"}
          aria-label="feedback-message"
        >
          {message}
        </Toast.Body>
      </Toast>
    </motion.div>
  );
};

FeedbackComponent.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  toggleVisible: PropTypes.func.isRequired,
};
