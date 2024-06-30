import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Button from "react-bootstrap/Button";

export const Header = () => {
  const { user, signOut } = useAuth();

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const response = await signOut();

      console.log(response);
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
        <Link className="text-decoration-none" to="/">
          <h1
            className="display-6 text-body"
            aria-label="brand"
            title="Return to home page."
          >
            Simplifica.
          </h1>
        </Link>
      </Navbar.Brand>
      {user && (
        <Button variant="dark" onClick={handleClick}>
          Sign Out
        </Button>
      )}
    </Navbar>
  );
};
