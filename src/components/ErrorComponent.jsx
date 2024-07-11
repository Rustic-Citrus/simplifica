import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import { Container, Stack, Button } from "react-bootstrap";

export const ErrorComponent = ({ message = "" }) => {
  return (
    <Container className="pt-5 mt-5 px-4 h-100 align-middle">
      <Stack gap={1} className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
        <h1 className="display-1 mt-5 pt-5 text-danger" aria-label="title">
          Uh-oh...
        </h1>
        <p aria-label="message">
          {message.trim() !== ""
            ? message
            : "An unexpected error occurred. Click below to return to the homepage or see the console for more information."}
        </p>
        <Link to="/">
          <Button
            variant="dark"
            className="w-100"
            title="Return to home page."
            aria-label="back-button"
          >
            Back
          </Button>
        </Link>
      </Stack>
    </Container>
  );
};

ErrorComponent.propTypes = {
  message: PropTypes.string,
};
