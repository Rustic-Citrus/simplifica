import { useAuth } from "../hooks/useAuth";
import { LoadingWithSpinner } from "./LoadingWithSpinner";
import { ButtonAnimationDecorator } from "./decorators/ButtonAnimationDecorator";

import { useState } from "react";

import { Link } from "react-router-dom";

import { Navbar, Button } from "react-bootstrap";

export const Header = () => {
  const { user, signOut } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOutClick = async (e) => {
    e.preventDefault();

    setIsSigningOut(true);

    try {
      setTimeout(async () => {
        await signOut();
      }, 1000);
    } catch (error) {
      console.log(error.message);
    } finally {
      setTimeout(() => {
        setIsSigningOut(false);
      }, 2000);
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
      {user && (
        <ButtonAnimationDecorator>
          <Button
            variant="dark"
            onClick={handleSignOutClick}
            disabled={isSigningOut}
            className="w-100"
          >
            {isSigningOut ? (
              <LoadingWithSpinner loadingText="Signing out" />
            ) : (
              "Sign Out"
            )}
          </Button>
        </ButtonAnimationDecorator>
      )}
    </Navbar>
  );
};
