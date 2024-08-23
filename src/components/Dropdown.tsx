import { ButtonAnimationDecorator } from "./decorators";
import { useAuth } from "../hooks";
import { Link } from "react-router-dom";
import { Dropdown as BootstrapDropdown, DropdownButton } from "react-bootstrap";

export const Dropdown = (): React.JSX.Element => {
  const { user } = useAuth();

  return (
    <ButtonAnimationDecorator>
      <DropdownButton id="dropdown-menu" title="Menu" drop="down">
        <BootstrapDropdown.Item disabled={true}>Profile</BootstrapDropdown.Item>
        <BootstrapDropdown.Item>
          <Link to={`/${user._id}`}>Lesson Plans</Link>
        </BootstrapDropdown.Item>
      </DropdownButton>
    </ButtonAnimationDecorator>
  );
};
