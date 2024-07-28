import { Button } from "react-bootstrap";

interface SecondaryButtonProps {
  content: string | React.JSX.Element;
  title: string;
  ariaLabel: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const SecondaryButton = ({
  content,
  title,
  ariaLabel,
  onClick,
  disabled
}: SecondaryButtonProps) => {
  return (
    <Button
      variant="secondary"
      aria-label={ariaLabel}
      className="w-100"
      title={title}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </Button>
  );
};
