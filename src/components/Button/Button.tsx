import "./Button.scss";
import { ReactNode } from "react";
import bem from "../../common/bem";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  large?: boolean;
};

const buttonClassNames = bem("button");

export default function Button({
  children,
  onClick,
  disabled,
  className,
  large,
}: ButtonProps) {
  return (
    <button
      className={buttonClassNames({ large }).mix(className)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
