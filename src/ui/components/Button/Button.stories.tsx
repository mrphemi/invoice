import type { Meta, StoryObj } from "@storybook/nextjs";

import Plus from "../../icons/plus";

// import { fn } from "storybook/test";

import Button from "./Button";

const meta = {
  title: "Example/Button",
  component: Button,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

const PlusIcon = () => {
  return (
    <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full">
      <Plus />
    </div>
  );
};

export const Primary: Story = {
  args: {
    as: "button",
    type: "primary",
    label: "Mark as Paid",
    onClick: () => alert("Button clicked"),
  },
};

export const PrimaryLink: Story = {
  args: {
    as: "link",
    href: "#",
    type: "primary",
    label: "Mark as Paid",
  },
};

export const NewInvoiceExample: Story = {
  args: {
    ...Primary.args,
    label: "New Invoice",
    icon: <PlusIcon />,
    className: "pl-2 pr-4",
  },
};

export const Secondary: Story = {
  args: {
    as: "button",
    type: "secondary",
    label: "Edit",
    onClick: () => alert("Button clicked"),
  },
};

export const Tertiary: Story = {
  args: {
    as: "button",
    type: "tertiary",
    label: "Save as Draft",
    onClick: () => alert("Button clicked"),
  },
};

export const Danger: Story = {
  args: {
    as: "button",
    type: "danger",
    label: "Delete",
    onClick: () => alert("Button clicked"),
  },
};

export const Ghost: Story = {
  args: {
    as: "button",
    type: "ghost",
    label: "+ Add New Item",
    onClick: () => alert("Button clicked"),
  },
};

export const GhostFullWidth: Story = {
  args: { ...Ghost.args, className: "w-full" },
};
