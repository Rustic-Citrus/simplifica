import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Stack from "react-bootstrap/Stack";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { handleChangeHelper } from "../helper/handleHelper";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth.jsx";
import PropTypes from "prop-types";

export const SignIn = ({ triggerFeedback }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const { signIn } = useAuth();

  const handleUsernameChange = (e) => handleChangeHelper(e, setUsername);
  const handlePasswordChange = (e) => handleChangeHelper(e, setPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const feedback = [];

    const userData = { username, password };

    try {
      const response = await signIn(userData);

      if (response.status === 200) {
        feedback.push({
          type: "success",
          title: "Successfully Signed In",
          message: response.data.msg,
        });
      } else {
        feedback.push({
          type: "error",
          title: "Unsuccessful",
          message: response.data.msg,
        });
      }
    } catch (error) {
      feedback.push({
        type: "error",
        title: "Error",
        message: error.message,
      });
    }

    triggerFeedback(feedback);
  };

  return (
    <Container className="pt-5 mt-5 px-4 align-middle col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
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
                src={hidePassword ? "/simplifica-frontend/eye.svg" : "/simplifica-frontend/eye-slash.svg"}
                alt="Icon of an eye."
              />
            </Button>
          </InputGroup>
        </Form.Group>

        <Button
          type="submit"
          variant="dark"
          className="w-100"
          aria-label="sign-in-button"
          title="Click here to sign into your account."
        >
          Sign In
        </Button>
      </Form>
    </Container>
  );
};

SignIn.propTypes = {
  triggerFeedback: PropTypes.func,
};
