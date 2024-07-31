import { handleChangeHelper } from "../helper/handleHelper";
import { useAuth, useFeedback } from "../hooks";
import { LoadingWithSpinner, PrimaryButton } from "../components";
import {
  TransitionDecorator,
  ButtonAnimationDecorator,
} from "../components/decorators";
import { useState } from "react";
import {
  Form,
  Container,
  FloatingLabel,
  Stack,
  InputGroup,
  Button,
  Image,
} from "react-bootstrap";

export const SignIn = () => {
  const { triggerFeedback } = useFeedback();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const { signIn } = useAuth();

  const handleUsernameChange = (e) => handleChangeHelper(e, setUsername);
  const handlePasswordChange = (e) => handleChangeHelper(e, setPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSigningIn(true);

    const feedback = [];

    const userData = { username, password };

    try {
      const response = await signIn(userData);

      if (response.status === 200) {
        feedback.push({
          type: "success",
          title: "Success",
          message: response.data.msg,
        });
      } else {
        feedback.push({
          type: "error",
          title: "Error",
          message: response.data.msg,
        });
      }
    } catch (error) {
      feedback.push({
        type: "error",
        title: "Error",
        message: error.message,
      });
    } finally {
      setTimeout(() => {
        setIsSigningIn(false);
      }, 1000);
    }

    triggerFeedback(feedback);
  };

  return (
    <Container className="col-12 col-md-6 pt-3 px-2 pt-md-5 px-md-4 ms-md-4 align-middle">
      <TransitionDecorator>
        <Stack gap={1} className="mb-3">
          <h1 className="display-3 mt-5 pt-5" aria-label="title">
            Welcome back
          </h1>
        </Stack>
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group controlId="form">
            <FloatingLabel controlId="username-label" label="Your username">
              <Form.Control
                type="text"
                placeholder="Your username"
                className="mb-2"
                title="Type your username here."
                aria-label="username-input"
                onChange={handleUsernameChange}
              />
            </FloatingLabel>
            <InputGroup className="mb-2">
              <FloatingLabel controlId="password-label" label="Your password">
                <Form.Control
                  type={hidePassword ? "password" : "text"}
                  placeholder="Your password"
                  title="Type your password here."
                  aria-label="password-input"
                  onChange={handlePasswordChange}
                />
              </FloatingLabel>
              <Button
                variant="outline-secondary"
                onClick={() => setHidePassword(!hidePassword)}
                title="Click here to reveal your password."
                aria-label="hide-password-button"
              >
                <Image
                  src={
                    hidePassword
                      ? "/simplifica/eye.svg"
                      : "/simplifica/eye-slash.svg"
                  }
                  alt="Icon of an eye."
                />
              </Button>
            </InputGroup>
          </Form.Group>
          <ButtonAnimationDecorator>
            <PrimaryButton
              ariaLabel="sign-in-button"
              title="Click here to sign into your account."
              disabled={isSigningIn}
              content={
                isSigningIn ? (
                  <LoadingWithSpinner loadingText="Signing in" />
                ) : (
                  "Sign In"
                )
              }
              onClick={handleSubmit}
            />
          </ButtonAnimationDecorator>
        </Form>
      </TransitionDecorator>
    </Container>
  );
};
