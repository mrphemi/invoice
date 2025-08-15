import type { Meta, StoryObj } from "@storybook/nextjs";
import { fn } from "storybook/test";

import { Form as FormComponent, type FormInputs } from "./Form";

import { useForm, type Control, type UseFormTrigger } from "react-hook-form";

const meta = {
  component: FormComponent,
} satisfies Meta<typeof FormComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Form: Story = {
  render: (args) => {
    const { control, trigger, handleSubmit } = useForm<FormInputs>({
      defaultValues: {
        street: "",
        terms: "",
        date: undefined,
      },
    });

    return (
      <FormComponent
        {...args}
        control={control}
        trigger={trigger}
        onSubmit={handleSubmit((payload) => {
          console.log("Payload", payload);
        })}
      />
    );
  },
  args: {
    isSubmitting: false,
    hasSucceeded: false,
    hasErrored: false,
    control: {} as Control<FormInputs>,
    trigger: {} as UseFormTrigger<FormInputs>,
    onSubmit: () => fn(),
  },
};
