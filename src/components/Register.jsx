import { handleChangeHelper } from "../helper/handleHelper";
import { validatePassword, validateUsername } from "../../validation/validate";
import feedback from "../../data/feedback.json";
import { useAuth } from "../hooks/useAuth";

import { useState, useEffect } from "react";

import PropTypes from "prop-types";

import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import InputGroup from "react-bootstrap/InputGroup";

import { motion } from "framer-motion";

export const Register = ({ triggerFeedback }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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

    triggerFeedback(reportedFeedback);
  };

  return (
    <Container className="pt-5 mt-5 px-4 align-middle col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
      <motion.div
        initial={{ opacity: 0, x: -100, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
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
                      ? "/simplifica-frontend/eye.svg"
                      : "/simplifica-frontend/eye-slash.svg"
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
                      ? "/simplifica-frontend/eye.svg"
                      : "/simplifica-frontend/eye-slash.svg"
                  }
                  alt="Icon of an eye."
                />
              </Button>
            </InputGroup>
          </Form.Group>

          <Button
            type="submit"
            variant="dark"
            className="w-100"
            aria-label="get-started-button"
            title="Click here to register your account."
          >
            Get Started
          </Button>
        </Form>
      </motion.div>
    </Container>
  );
};

Register.propTypes = {
  triggerFeedback: PropTypes.func.isRequired,
};
