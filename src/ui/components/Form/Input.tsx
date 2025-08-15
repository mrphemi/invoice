import * as React from "react";
import type { Ref } from "react";

import type { FieldValues, UseFormTrigger } from "react-hook-form";

import { cn } from "@/lib/utils";

export type InputProps = {
  name: string;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  trigger?: UseFormTrigger<FieldValues[string]>;
  className?: string;
  value?: string;
  ref?: Ref<HTMLInputElement>;
};

type FormValidation = "success" | "error";

const Input = ({
  type = "text",
  name,
  value,
  label,
  trigger,
  onChange,
  error,
  className,
  ref,
  ...props
}: InputProps) => {
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
        value={value}
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
};

export default Input;
