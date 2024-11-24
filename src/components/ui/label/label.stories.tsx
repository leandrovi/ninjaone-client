import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./label";
import { Input } from "../input/input";

const meta = {
  title: "UI/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Default Label",
  },
};

export const WithInput: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Enter your email" />
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="required-input">
        Required Field <span className="text-red-500">*</span>
      </Label>
      <Input id="required-input" required />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="disabled-input" className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Disabled Field
      </Label>
      <Input id="disabled-input" disabled />
    </div>
  ),
};

export const WithCustomClassName: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="custom" className="text-blue-500 font-medium">
        Custom Styled Label
      </Label>
      <Input id="custom" />
    </div>
  ),
};

export const WithHelperText: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="helper">Password</Label>
      <Input type="password" id="helper" />
      <p className="text-sm text-gray-500">Must be at least 8 characters long</p>
    </div>
  ),
};
