import React from "react";
import { Button } from "react-bootstrap";

export const PrimaryButton = ({ content, title, ariaLabel, onClick }) => {
  return (
    <Button
      variant="primary"
      aria-label={ariaLabel}
      className="w-100"
      title={title}
      onClick={onClick}
    >
      {content}
    </Button>
  );
};
