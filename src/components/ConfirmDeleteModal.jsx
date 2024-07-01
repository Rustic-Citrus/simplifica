import PropTypes from "prop-types";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const ConfirmDeleteModal = ({ show, toggleShow, handleDeleteConfirmed }) => {
  const handleConfirm = () => {
    toggleShow();
    handleDeleteConfirmed();
  };

  return (
    <Modal variant="warning" show={show} onHide={toggleShow}>
      <Modal.Header closeButton>
        <Modal.Title>Warning</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        You are about to delete this lesson plan. Are you sure you want to
        continue?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggleShow}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ConfirmDeleteModal.propTypes = {
  show: PropTypes.bool,
  toggleShow: PropTypes.func,
  handleDeleteConfirmed: PropTypes.func
}