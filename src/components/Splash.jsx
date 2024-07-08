import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

import { Link } from "react-router-dom";

import { motion } from "framer-motion";

export const Splash = () => {
  return (
    <Container className="pt-5 mt-5 px-4 align-middle">
      <Stack gap={1}>
        <h1 className="display-1 mt-5 pt-5" aria-label="title">
          Simplifica
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
          >.</motion.span>
        </h1>
        <p aria-label="subtitle">
          Who said planning lessons couldn&apos;t be quick?
        </p>
      </Stack>
      <Stack gap={2} className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
        <Link to="/register">
          <Button
            variant="dark"
            aria-label="sign-up-button"
            className="w-100"
            title="Register for an account."
          >
            Sign Up (it&apos;s free!)
          </Button>
        </Link>
        <Link to="/login">
          <Button
            variant="outline-secondary"
            aria-label="sign-in-button"
            className="w-100"
            title="Sign in to an account."
          >
            Sign In
          </Button>
        </Link>
      </Stack>
    </Container>
  );
};
