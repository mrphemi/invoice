"use client";

import { Controller, type Control, type UseFormTrigger } from "react-hook-form";

import Input from "./Input";
import FormSelect from "./Select";
import Button from "../Button/Button";
import { DatePicker } from "./DatePicker";

export type FormInputs = {
  street: string;
  terms: string;
  date: Date | undefined;
};

export type FormProps = {
  onSubmit: (data: any) => void;
  control: Control<FormInputs>;
  trigger: UseFormTrigger<FormInputs>;
  isSubmitting: boolean;
  hasSucceeded: boolean;
  hasErrored: boolean;
};

const isInputEmptyCheck = (value: string) => {
  return value.trim() === "" ? "Field cannot be empty" : true;
};

export const Form = ({
  onSubmit,
  control,
  trigger,
  isSubmitting,
  hasSucceeded,
  hasErrored,
}: FormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="col-span-4 col-start-6 flex flex-col gap-4"
    >
      <Controller
        name="street"
        control={control}
        rules={{
          required: "This field is required",
          validate: {
            isEmpty: (v) => isInputEmptyCheck(v),
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <Input
            label="Street Address"
            {...field}
            trigger={trigger}
            error={error?.message}
          />
        )}
      />

      <Controller
        name="terms"
        control={control}
        rules={{
          required: "This field is required",
        }}
        render={({ field, fieldState: { error } }) => (
          <FormSelect
            label="Payment Terms"
            options={[
              { value: "one", label: "Net 1 day" },
              { value: "seven", label: "Net 7 days" },
              { value: "fourteen", label: "Net 14 days" },
              { value: "thirty", label: "Net 30 days" },
            ]}
            {...field}
            onChange={(value) => field.onChange(value)}
            error={error?.message}
          />
        )}
      />

      <Controller
        name="date"
        control={control}
        rules={{
          required: "Please select a date",
        }}
        render={({ field, fieldState: { error } }) => (
          <DatePicker
            label="Issue Date"
            error={error?.message}
            selected={field.value}
            onSelect={field.onChange}
          />
        )}
      />

      <Button
        type="submit"
        theme="primary"
        label={isSubmitting ? "Submitting..." : "Submit"}
        className="mt-4 w-fit"
        disabled={isSubmitting}
      />

      {hasSucceeded && <p className="">{/* Success message */}</p>}

      {hasErrored && <p className="">{/* Error message */}</p>}
    </form>
  );
};
