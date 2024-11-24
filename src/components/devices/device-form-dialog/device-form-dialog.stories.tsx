import type { Meta, StoryObj } from "@storybook/react";
import { DeviceFormDialog } from "./device-form-dialog";
import { DialogContent, DialogTrigger } from "@/components/ui/dialog/dialog";
import { Dialog } from "@/components/ui/dialog/dialog";
import { Button } from "@/components/ui/button/button";

const meta: Meta<typeof DeviceFormDialog> = {
  title: "Devices/DeviceFormDialog",
  component: DeviceFormDialog,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story, { args }) => (
      <Dialog open={true}>
        <DialogTrigger asChild>
          <Button>{args.mode === "create" ? "Create" : "Edit"}</Button>
        </DialogTrigger>
        <DialogContent>
          <Story {...args} />
        </DialogContent>
      </Dialog>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DeviceFormDialog>;

export const Create: Story = {
  args: {
    mode: "create",
    onSubmit: async (values) => console.log(values),
    isSubmitting: false,
    error: null,
  },
};

export const Edit: Story = {
  args: {
    mode: "edit",
    device: {
      id: "1",
      system_name: "Test Device",
      type: "WINDOWS",
      hdd_capacity: "500",
    },
    onSubmit: async (values) => console.log(values),
    isSubmitting: false,
    error: null,
  },
};

export const WithError: Story = {
  args: {
    mode: "create",
    onSubmit: async (values) => console.log(values),
    isSubmitting: false,
    error: "Something went wrong",
  },
};

export const Submitting: Story = {
  args: {
    mode: "create",
    onSubmit: async (values) => console.log(values),
    isSubmitting: true,
    error: null,
  },
};
