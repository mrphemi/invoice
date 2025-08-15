"use client";

import * as React from "react";
import * as Popover from "@radix-ui/react-popover";

import { Calendar } from "../calendar";

import { Calender as CalendarIcon } from "../../icons/calender";

type DatePickerProps = {
  label: string;
  error?: string;
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
};

export function DatePicker({
  label,
  error,
  selected,
  onSelect,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date>();

  return (
    <div className="flex flex-col gap-2.5">
      <label htmlFor="date" className="body-1 text-cool-blue">
        {label}
      </label>
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger className="border border-indigo-tint p-4 rounded w-fit body-1 font-bold flex justify-between gap-24 items-center data-[state=open]:border-primary-indigo">
          <span>
            {date
              ? date.toLocaleString("default", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : "Select Date"}
          </span>
          <CalendarIcon />
        </Popover.Trigger>
        <Popover.Content
          side="bottom"
          align="start"
          className="bg-white shadow px-5 py-6 rounded-lg mt-6"
        >
          <Calendar
            mode="single"
            selected={selected}
            onSelect={(d) => {
              setDate(d);
              setOpen(false);
              onSelect?.(d);
            }}
          />
        </Popover.Content>
      </Popover.Root>
      <span className="inline-block body-1 text-error-red">
        {error && <>{error}</>}
      </span>
    </div>
  );
}
