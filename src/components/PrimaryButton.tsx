import { Button } from "react-bootstrap";

interface PrimaryButtonProps {
  content: string | React.JSX.Element;
  title: string;
  ariaLabel: string;
  disabled: boolean;
  onClick: () => void;
}

export const PrimaryButton = ({
  content,
  title,
  ariaLabel,
  onClick,
  disabled
}: PrimaryButtonProps) => {
  return (
    <Button
      variant="primary"
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
