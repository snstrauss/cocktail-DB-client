import "./Button.scss";
import { ReactNode } from "react";
import bem from "../../common/bem";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

const buttonClassNames = bem("button");

export default function Button({
  children,
  onClick,
  disabled,
  className,
}: ButtonProps) {
  return (
    <button
      className={buttonClassNames.mix(className)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
