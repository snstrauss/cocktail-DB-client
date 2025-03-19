import "./Input.scss";
import { FC, SVGProps, useState } from "react";
import bem from "../../common/bem";

type InputProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
  Icon?: FC<SVGProps<SVGSVGElement>>;
};

const inputClassNames = bem("input");

export default function Input({
  value = "",
  onChange,
  placeholder = "",
  type = "text",
  className,
  Icon,
}: InputProps) {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className={inputClassNames.mix(className)}>
      <input
        type={type}
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={inputClassNames("input-field")}
      />
      {Icon ? (
        <div className={inputClassNames("icon")}>
          <Icon />
        </div>
      ) : null}
    </div>
  );
}
