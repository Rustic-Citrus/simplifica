import PropTypes from "prop-types";

import Spinner from "react-bootstrap/Spinner";

export const LoadingWithSpinner = ({ loadingText }) => {
  return (
    <span aria-label="loading-text">
      {`${loadingText}...`}
      <Spinner
        as="span"
        animation="border"
        className="mx-3"
        size="sm"
        role="status"
        aria-hidden="true"
      />
    </span>
  );
};

LoadingWithSpinner.propTypes = {
  loadingText: PropTypes.string.isRequired,
};
