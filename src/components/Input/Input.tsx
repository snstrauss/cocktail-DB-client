import "./Input.scss";
import { FC, SVGProps, useState } from "react";
import bem from "../../common/bem";
import { Field } from "react-final-form";

type BaseInputProps = {
  onChange?: (value: string) => void;
  hasError?: boolean;
};

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  Icon?: FC<SVGProps<SVGSVGElement>>;
} & BaseInputProps;

const inputClassNames = bem("input");

export function Input({ onChange, Icon, hasError, ...inputProps }: InputProps) {
  const { value, type, placeholder, name, className } = inputProps;

  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div
      className={inputClassNames({
        "has-error": hasError,
      }).mix(className)}
    >
      <input
        type={type}
        name={name}
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={inputClassNames("input-field", {
          "has-error": hasError,
        })}
      />
      {Icon ? (
        <div className={inputClassNames("icon")}>
          <Icon />
        </div>
      ) : null}
    </div>
  );
}

const textAreaClassNames = bem("textarea");

type TextAreaProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "onChange"
> &
  BaseInputProps;

export function TextArea({
  hasError,
  onChange,
  ...textAreaProps
}: TextAreaProps) {
  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const newValue = e.target.value;
    onChange?.(newValue);
    if (onChange) {
      onChange(newValue);
    }
  }

  return (
    <textarea
      {...textAreaProps}
      onChange={handleChange}
      className={textAreaClassNames({
        "has-error": hasError,
      }).mix(textAreaProps.className)}
    />
  );
}

type FormFieldProps = {
  name: string;
  validate?: (value: string) => string | undefined;
  placeholder?: string;
  textArea?: boolean;
  className?: string;
} & BaseInputProps;

export function FormField({
  name,
  validate,
  placeholder,
  textArea,
  className,
}: FormFieldProps) {
  return (
    <Field
      name={name}
      validate={validate}
      render={({ input, meta }) => {
        const hasError = meta.touched && Boolean(meta.error);

        const FieldComponent = textArea ? TextArea : Input;

        return (
          <FieldComponent
            {...input}
            hasError={hasError}
            placeholder={hasError ? meta.error : placeholder}
            className={className}
          />
        );
      }}
    />
  );
}
