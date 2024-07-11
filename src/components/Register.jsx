import { handleChangeHelper } from "../helper/handleHelper";
import { validatePassword, validateUsername } from "../validation/validate";
import feedback from "../../data/feedback.json";
import { useAuth } from "../hooks/useAuth";
import { useFeedback } from "../hooks/useFeedback";
import { TransitionDecorator } from "./decorators/TransitionDecorator.jsx";
import { ButtonAnimationDecorator } from "./decorators/ButtonAnimationDecorator.jsx";

import { useState, useEffect } from "react";

import {
  Container,
  Stack,
  FloatingLabel,
  Form,
  Button,
  Image,
  InputGroup,
  Spinner,
} from "react-bootstrap";

export const Register = () => {
  const { triggerFeedback } = useFeedback();
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const { register } = useAuth();

  useEffect(() => {
    validatePassword(password) &&
    validateUsername(username) &&
    password === confirmedPassword
      ? setValidated(true)
      : setValidated(false);
  }, [username, password, confirmedPassword]);

  const handleUsernameChange = (e) => handleChangeHelper(e, setUsername);
  const handlePasswordChange = (e) => handleChangeHelper(e, setPassword);
  const handleConfirmedPasswordChange = (e) =>
    handleChangeHelper(e, setConfirmedPassword);

  const handleSubmit = async (e) => {
    setIsRegistering(true);

    const reportedFeedback = [];

    e.preventDefault();

    if (!validated) {
      e.stopPropagation();

      const errors = [];

      if (password !== confirmedPassword) errors.push("passwords_not_matching");
      if (!validatePassword(password)) errors.push("invalid_password");
      if (!validateUsername(username)) errors.push("invalid_username");

      for (const error of errors) {
        for (const feedbackItem of feedback) {
          if (feedbackItem.name === error)
            reportedFeedback.push(feedbackItem.info);
        }
      }
    } else {
      try {
        const response = await register({ username, password });

        if (response.status === 201) {
          reportedFeedback.push({
            title: "Registration Successful",
            message: response.data.msg,
            type: "success",
          });
        } else {
          reportedFeedback.push({
            title: "Registration Failed",
            message: response.data.msg,
            type: "error",
          });
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    setTimeout(() => {
      setIsRegistering(false);
    }, 1000);

    triggerFeedback(reportedFeedback);
  };

  return (
    <Container className="col-12 col-md-6 pt-3 px-2 pt-md-5 px-md-4 ms-md-4 pb-4 align-middle">
      <TransitionDecorator>
        <Stack gap={1}>
          <h1 className="display-3 mt-5 pt-5" aria-label="title">
            Create an account
          </h1>
          <p aria-label="subtitle">Enter a username and password</p>
        </Stack>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
            <InputGroup hasValidation className="mb-2">
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
            <InputGroup hasValidation className="mb-2">
              <FloatingLabel
                controlId="confirm-password-label"
                label="Confirm your password"
              >
                <Form.Control
                  type={hideConfirmPassword ? "password" : "text"}
                  placeholder="Confirm your password"
                  aria-label="confirm-password-input"
                  title="Type your password again here."
                  onChange={handleConfirmedPasswordChange}
                />
              </FloatingLabel>
              <Button
                variant="outline-secondary"
                onClick={() => setHideConfirmPassword(!hideConfirmPassword)}
                title="Click here to reveal your password."
                aria-label="hide-confirm-password-button"
              >
                <Image
                  src={
                    hideConfirmPassword
                      ? "/simplifica/eye.svg"
                      : "/simplifica/eye-slash.svg"
                  }
                  alt="Icon of an eye."
                />
              </Button>
            </InputGroup>
          </Form.Group>
          <ButtonAnimationDecorator>
            <Button
              type="submit"
              variant="dark"
              className="w-100"
              aria-label="get-started-button"
              title="Click here to register your account."
              disabled={isRegistering}
            >
              {isRegistering ? (
                <span>
                  Creating your account...{" "}
                  <Spinner
                    as="span"
                    animation="border"
                    className="mx-3"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                </span>
              ) : (
                "Get Started"
              )}
            </Button>
          </ButtonAnimationDecorator>
        </Form>
      </TransitionDecorator>
    </Container>
  );
};
