"use client";

import * as React from "react";
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker";

import { cn } from "@/lib/utils";
import Arrow from "../icons/arrow";

function Calendar({
  className,
  classNames,
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      hideWeekdays
      showOutsideDays
      className={cn(
        "bg-white group/calendar p-0 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        className
      )}
      captionLayout="label"
      formatters={{
        formatCaption: (date) =>
          date.toLocaleString("default", { month: "short", year: "numeric" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit body-1 font-bold", defaultClassNames.root),
        selected: cn("text-primary-indigo", defaultClassNames.root),
        months: cn(
          "flex gap-4 flex-col md:flex-row relative",
          defaultClassNames.months
        ),
        month: cn("flex flex-col w-full gap-4", defaultClassNames.month),
        nav: cn(
          "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
          defaultClassNames.nav
        ),
        button_previous: cn(
          "h-(--cell-size) aria-disabled:opacity-50 p-0 select-none cursor-pointer",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          "h-(--cell-size) aria-disabled:opacity-50 p-0 select-none cursor-pointer",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
          defaultClassNames.month_caption
        ),
        caption_label: cn("select-none", defaultClassNames.caption_label),
        table: "w-full border-collapse",
        week: cn("flex w-full mt-2", defaultClassNames.week),
        day: cn(
          "relative w-full h-full text-center last:[&>button]:pr-0 first:[&>button]:pl-0 [& :first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none",
          defaultClassNames.day
        ),
        today: cn("text-primary-indigo", defaultClassNames.today),
        outside: cn(
          "text-[#0C0E16]/5 aria-selected:text-primary-indigo dark:text-[#0C0E16]/5 dark:aria-selected:text-primary-indigo",
          defaultClassNames.outside
        ),
        disabled: cn(
          "text-neutral-500 opacity-50 dark:text-neutral-400",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          );
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return <Arrow className={cn("rotate-180", className)} {...props} />;
          }

          return <Arrow className={cn(className)} {...props} />;
        },
        DayButton: CalendarDayButton,
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <button
      ref={ref}
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn("cursor-pointer p-2", defaultClassNames.day, className)}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
