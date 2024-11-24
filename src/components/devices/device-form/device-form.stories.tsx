import type { Meta, StoryObj } from "@storybook/react";
import { DeviceForm } from "./device-form";

const meta: Meta<typeof DeviceForm> = {
  title: "Devices/DeviceForm",
  component: DeviceForm,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof DeviceForm>;

export const Empty: Story = {
  args: {
    onSubmit: async (values) => console.log(values),
    onCancel: () => console.log("Cancel clicked"),
    isSubmitting: false,
  },
};

export const WithDevice: Story = {
  args: {
    device: {
      id: "1",
      system_name: "Test Device",
      type: "WINDOWS",
      hdd_capacity: "500",
    },
    onSubmit: async (values) => console.log(values),
    onCancel: () => console.log("Cancel clicked"),
    isSubmitting: false,
  },
};

export const WithError: Story = {
  args: {
    error: "Something went wrong",
    onSubmit: async (values) => console.log(values),
    onCancel: () => console.log("Cancel clicked"),
    isSubmitting: false,
  },
};

export const Submitting: Story = {
  args: {
    onSubmit: async (values) => console.log(values),
    onCancel: () => console.log("Cancel clicked"),
    isSubmitting: true,
  },
};
