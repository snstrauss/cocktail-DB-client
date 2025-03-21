import "./Button.scss";
import { ButtonHTMLAttributes, ReactNode } from "react";
import bem from "../../common/bem";

type ButtonProps = {
  children: ReactNode;
  large?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const buttonClassNames = bem("button");

export default function Button({
  children,
  onClick,
  disabled,
  className,
  type,
  large,
}: ButtonProps) {
  return (
    <button
      className={buttonClassNames({ large }).mix(className)}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}
