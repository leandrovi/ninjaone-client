import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";

const meta = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled input",
    disabled: true,
  },
};

export const WithType: Story = {
  render: () => (
    <div className="flex flex-col space-y-4 w-[300px]">
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <Input type="date" />
      <Input type="number" placeholder="Amount" />
      <Input type="search" placeholder="Search..." />
    </div>
  ),
};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: "Default text",
  },
};

export const FileInput: Story = {
  args: {
    type: "file",
  },
};

export const WithCustomWidth: Story = {
  render: () => (
    <div className="w-[500px]">
      <Input placeholder="Custom width input" />
    </div>
  ),
};

export const WithCustomStyling: Story = {
  args: {
    placeholder: "Custom styled input",
    className: "border-primary text-primary",
  },
};

export const WithFormLayout: Story = {
  render: () => (
    <form className="w-[300px] space-y-4">
      <div className="space-y-2">
        <label htmlFor="username" className="text-sm font-medium">
          Username
        </label>
        <Input id="username" placeholder="Enter username" />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <Input id="email" type="email" placeholder="Enter email" />
      </div>
    </form>
  ),
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    defaultValue: "Read-only content",
  },
};

export const Required: Story = {
  render: () => (
    <div className="w-[300px] space-y-2">
      <label htmlFor="required-input" className="text-sm font-medium">
        Required Field <span className="text-red-500">*</span>
      </label>
      <Input id="required-input" required placeholder="This field is required" />
    </div>
  ),
};
