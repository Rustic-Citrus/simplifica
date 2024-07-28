import { PrimaryButton } from "./PrimaryButton";
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
            <PrimaryButton
              content="Sign Up (it's free!)"
              title="Register for an account."
              ariaLabel="sign-up-button"
            />
          </ButtonAnimationDecorator>
        </Link>
        <Link to="/login">
          <ButtonAnimationDecorator>
            <Button
              variant="secondary"
              aria-label="sign-in-button"
              className="w-100"
              title="Sign in to an account."
              style={{ color: "white" }}
            >
              Sign In
            </Button>
          </ButtonAnimationDecorator>
        </Link>
      </Stack>
    </TransitionDecorator>
  );
};
