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
        <strong className="me-auto">{title}</strong>
        <small>{date.toLocaleTimeString()}</small>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
};

Feedback.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  toggleVisible: PropTypes.func.isRequired,
};
