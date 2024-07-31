import Spinner from "react-bootstrap/Spinner";

export const LoadingWithSpinner = ({
  loadingText,
}: {
  loadingText: string;
}) => {
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
