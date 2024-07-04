import PropTypes from "prop-types";

import Toast from "react-bootstrap/Toast";

export const Feedback = ({ title, message, type, toggleVisible }) => {
  const date = new Date();

  return (
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
  );
};

Feedback.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  toggleVisible: PropTypes.func.isRequired,
};
