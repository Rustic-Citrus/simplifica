import { validatePassword, validateUsername } from "../validation/validate";
import feedback from "../../data/feedback.json";
import { useAuth, useFeedback } from "../hooks";
import {
  TransitionDecorator,
  ButtonAnimationDecorator,
} from "../components/decorators";
import { PrimaryButton } from "../components";
import React, { useState, useEffect } from "react";
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
import { FeedbackItem, UserResponse } from "../interfaces";

export const Register = () => {
  const { triggerFeedback } = useFeedback();
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [validated, setValidated] = useState(false);
  const [formState, setFormState] = useState({
    username: "",
    password: "",
    confirmedPassword: "",
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const { register } = useAuth();

  useEffect(() => {
    const { username, password, confirmedPassword } = formState;
    setValidated(
      validatePassword(password) &&
        validateUsername(username) &&
        password === confirmedPassword
    );
  }, [formState]);

  const getValidationErrors = ({
    username,
    password,
    confirmedPassword,
  }: typeof formState) => {
    const errors = [];
    if (password !== confirmedPassword) errors.push("passwords_not_matching");
    if (!validatePassword(password)) errors.push("invalid_password");
    if (!validateUsername(username)) errors.push("invalid_username");
    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsRegistering(true);

    const reportedFeedback: FeedbackItem[] = [];

    if (!validated) {
      e.stopPropagation();
      const errors = getValidationErrors(formState);

      for (const error of errors) {
        const feedbackItem = feedback.find((item) => item.name === error);
        if (feedbackItem) {
          reportedFeedback.push(feedbackItem.info);
        }
      }
    } else {
      try {
        const response = await register(formState);

        reportedFeedback.push({
          title:
            response.status === 201
              ? "Registration Successful"
              : "Registration Failed",
          message: response.data.msg,
          type: response.status === 201 ? "success" : "error",
        });
      } catch (error: any) {
        console.log(error.message);
      }
    }

    setTimeout(() => {
      setIsRegistering(false);
    }, 1000);

    triggerFeedback(reportedFeedback);
  };

  return (
    <TransitionDecorator>
      <Stack gap={1}>
        <h1 className="display-3 mt-5 pt-5" aria-label="title">
          Create an account
        </h1>
        <p aria-label="subtitle">Enter a username and password</p>
      </Stack>
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="col-auto col-sm-8 col-lg-6 col-xl-5">
        <Form.Group controlId="form">
          <FloatingLabel controlId="username-label" label="Your username">
            <Form.Control
              type="text"
              placeholder="Your username"
              name="username"
              className="mb-2"
              title="Type your username here."
              aria-label="username-input"
              onChange={handleChange}
            />
          </FloatingLabel>
          <InputGroup hasValidation className="mb-2">
            <FloatingLabel controlId="password-label" label="Your password">
              <Form.Control
                type={hidePassword ? "password" : "text"}
                placeholder="Your password"
                name="password"
                title="Type your password here."
                aria-label="password-input"
                onChange={handleChange}
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
                name="confirmedPassword"
                aria-label="confirm-password-input"
                title="Type your password again here."
                onChange={handleChange}
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
          <PrimaryButton
            ariaLabel="get-started-button"
            title="Click here to register your account."
            disabled={isRegistering}
            content={
              isRegistering ? (
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
              )
            }
          />
        </ButtonAnimationDecorator>
      </Form>
    </TransitionDecorator>
  );
};
