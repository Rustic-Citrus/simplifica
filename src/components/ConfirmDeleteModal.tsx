import { Button, Modal } from "react-bootstrap";

export const ConfirmDeleteModal = ({
  show,
  toggleShow,
  handleDeleteConfirmed,
}: {
  show: boolean;
  toggleShow: () => void;
  handleDeleteConfirmed: () => void;
}) => {
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
