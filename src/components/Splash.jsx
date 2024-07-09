import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

import { Link } from "react-router-dom";

import { motion } from "framer-motion";

export const Splash = () => {
  return (
    <motion.div
      className="pt-3 px-2 pt-md-5 px-md-4 ms-md-4 align-middle"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <Stack gap={1}>
        <h1 className="display-1 mt-5 pt-5" aria-label="title">
          Simplifica.
        </h1>
        <p aria-label="subtitle">
          Who said planning lessons couldn&apos;t be quick?
        </p>
      </Stack>
      <Stack gap={2} className="col-auto col-sm-8 col-lg-6 col-xl-5">
        <Link to="/register">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="dark"
              aria-label="sign-up-button"
              className="w-100"
              title="Register for an account."
            >
              Sign Up (it&apos;s free!)
            </Button>
          </motion.div>
        </Link>
        <Link to="/login">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="outline-secondary"
              aria-label="sign-in-button"
              className="w-100"
              title="Sign in to an account."
              style={{ borderColor: "darkgrey", color: "black" }}
            >
              Sign In
            </Button>
          </motion.div>
        </Link>
      </Stack>
    </motion.div>
  );
};
