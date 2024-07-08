import { useAuth } from "../hooks/useAuth";

import { useState } from "react";

import { Link } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

export const Header = () => {
  const { user, signOut } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOutClick = async (e) => {
    e.preventDefault();

    setIsSigningOut(true);

    try {
      await signOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary justify-content-between text-center align-items-center px-5"
      sticky="top"
    >
      <Navbar.Brand>
        <Link className="align-items-center text-decoration-none" to="/">
          <h1
            className="display-6 mb-0"
            aria-label="brand"
            title="Return to home page."
          >
            Simplifica.
          </h1>
        </Link>
      </Navbar.Brand>
      {user && !isSigningOut && (
        <Button variant="dark" onClick={handleSignOutClick}>
          Sign Out
        </Button>
      )}
      {isSigningOut && (
        <Spinner
          animation="border"
          role="status"
          size="sm"
          className="d-flex justify-content center align-items-center"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </Navbar>
  );
};
