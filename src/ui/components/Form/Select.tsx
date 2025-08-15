import * as React from "react";
import type { Ref } from "react";

import * as Select from "@radix-ui/react-select";

export type SelectProps = {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  onChange?: (value: string) => void;
  error?: string;
  ref?: Ref<HTMLSelectElement>;
  className?: string;
};

const FormSelect = ({
  name,
  label,
  onChange,
  error,
  ref,
  className,
  ...props
}: SelectProps) => {
  return (
    <div className="inline-grid gap-2.5">
      <label htmlFor={`input-${name}`} className="body-1 text-cool-blue">
        {label}
      </label>

      <Select.Root name={name} onValueChange={onChange} {...props}>
        <Select.Trigger className="min-w-52 w-fit border border-indigo-tint py-4 px-5 rounded-sm body-1 text-bold placeholder:body-1 outline-primary-indigo hover:border-primary-indigo cursor-pointer data-[state=open]:border-primary-indigo flex justify-between items-center">
          <Select.Value placeholder="Select an option" />
          <Select.Icon>
            <svg
              width="11"
              height="7"
              viewBox="0 0 11 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L5.2279 5.2279L9.4558 1"
                stroke="#7C5DFA"
                strokeWidth="2"
              />
            </svg>
          </Select.Icon>
        </Select.Trigger>
        <Select.Content
          position="popper"
          className="rounded-lg body-1 text-bold shadow shadow-indigo-tint mt-6 bg-white w-(--radix-select-trigger-width) max-h-(--radix-select-content-available-height)"
        >
          <Select.Viewport className="divide-y divide-indigo-tint">
            {props.options.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className="py-4 px-6 outline-primary-indigo data-[highlighted]:text-primary-indigo cursor-pointer"
              >
                <Select.ItemText>{option.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Root>
      <span className="inline-block body-1 text-error-red">
        {error && <>{error}</>}
      </span>
    </div>
  );
};

export default FormSelect;
