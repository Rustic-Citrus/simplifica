import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export const Error = () => {
  return (
    <Container className="pt-5 mt-5 px-4 h-100 align-middle">
      <Stack gap={1} className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
        <h1 className="display-1 mt-5 pt-5 text-danger" aria-label="title">
          Uh-oh...
        </h1>
        <p aria-label="message">
          An unexpected error occurred. Click below to return to the homepage or see the console for more information.
        </p>
        <Link to="/">
          <Button variant="dark" className="w-100" title="Return to home page.">Back</Button>
        </Link>
      </Stack>
    </Container>
  );
};
