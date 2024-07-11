import { TransitionDecorator } from "./decorators/TransitionDecorator";
import { ButtonAnimationDecorator } from "./decorators/ButtonAnimationDecorator";

import { Button, Stack } from "react-bootstrap";

import { Link } from "react-router-dom";

export const Splash = () => {
  return (
    <TransitionDecorator>
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
          <ButtonAnimationDecorator>
            <Button
              variant="dark"
              aria-label="sign-up-button"
              className="w-100"
              title="Register for an account."
            >
              Sign Up (it&apos;s free!)
            </Button>
          </ButtonAnimationDecorator>
        </Link>
        <Link to="/login">
          <ButtonAnimationDecorator>
            <Button
              variant="outline-secondary"
              aria-label="sign-in-button"
              className="w-100"
              title="Sign in to an account."
              style={{ borderColor: "darkgrey", color: "black" }}
            >
              Sign In
            </Button>
          </ButtonAnimationDecorator>
        </Link>
      </Stack>
    </TransitionDecorator>
  );
};
