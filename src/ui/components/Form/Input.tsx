import * as React from "react";

import type { FieldValues, UseFormTrigger } from "react-hook-form";

import { cn } from "@/ui/utils";

export type InputProps = {
  name: string;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  trigger?: UseFormTrigger<FieldValues[string]>;
  className?: string;
  value?: string;
};

type FormValidation = "success" | "error";

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = "text",
      name,
      label,
      trigger,
      onChange,
      error,
      className,
      ...props
    },
    ref
  ) => {
    const [validation, setValidation] = React.useState<
      FormValidation | undefined
    >(undefined);

    return (
      <div className="inline-grid gap-2.5">
        <label htmlFor={`input-${name}`} className="body-1 text-cool-blue">
          {label}
        </label>
        <input
          ref={ref}
          type={type}
          name={name}
          id={`input-${name}`}
          onChange={onChange}
          className={cn(
            "body-1 border border-indigo-tint py-4 px-5 w-fit text-bold rounded-sm outline-accent-lavender",
            className
          )}
          {...props}
          onBlur={async () => {
            if (trigger) {
              const isFieldValid = await trigger(name);
              setValidation(isFieldValid ? "success" : "error");
            }
          }}
        />
        <span className="inline-block body-1 text-error-red">
          {error && <>{error}</>}
        </span>
      </div>
    );
  }
);

export default Input;
