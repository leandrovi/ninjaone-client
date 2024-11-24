import type { Meta, StoryObj } from "@storybook/react";
import { MultiSelect } from "./multi-select";
import { Laptop, Smartphone, Tablet, Watch, Tv, Monitor } from "lucide-react";

const meta = {
  title: "UI/MultiSelect",
  component: MultiSelect,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof MultiSelect>;

const deviceOptions = [
  { label: "Laptop", value: "laptop", icon: Laptop },
  { label: "Smartphone", value: "smartphone", icon: Smartphone },
  { label: "Tablet", value: "tablet", icon: Tablet },
  { label: "Smartwatch", value: "smartwatch", icon: Watch },
  { label: "TV", value: "tv", icon: Tv },
  { label: "Monitor", value: "monitor", icon: Monitor },
];

export const Default: Story = {
  args: {
    options: deviceOptions,
    placeholder: "Select devices",
    onValueChange: (values) => console.log("Selected values:", values),
  },
};

export const WithPreselectedValues: Story = {
  args: {
    options: deviceOptions,
    defaultValue: ["laptop", "smartphone"],
    placeholder: "Select devices",
    onValueChange: (values) => console.log("Selected values:", values),
  },
};

export const CustomMaxCount: Story = {
  args: {
    options: deviceOptions,
    maxCount: 2,
    placeholder: "Select devices (shows max 2)",
    onValueChange: (values) => console.log("Selected values:", values),
  },
};

export const SecondaryVariant: Story = {
  args: {
    options: deviceOptions,
    variant: "secondary",
    placeholder: "Select devices",
    onValueChange: (values) => console.log("Selected values:", values),
  },
};

export const DestructiveVariant: Story = {
  args: {
    options: deviceOptions,
    variant: "destructive",
    placeholder: "Select devices",
    onValueChange: (values) => console.log("Selected values:", values),
  },
};

export const WithoutIcons = {
  args: {
    options: deviceOptions.map(({ label, value }) => ({ label, value })),
    placeholder: "Select devices",
    onValueChange: (values: any) => console.log("Selected values:", values),
  },
};

export const ModalPopover: Story = {
  args: {
    options: deviceOptions,
    modalPopover: true,
    placeholder: "Select devices (modal)",
    onValueChange: (values) => console.log("Selected values:", values),
  },
};

export const CustomClassName: Story = {
  args: {
    options: deviceOptions,
    className: "min-w-[300px] border-blue-500",
    placeholder: "Select devices",
    onValueChange: (values) => console.log("Selected values:", values),
  },
};

export const WithCustomWidth: Story = {
  render: () => (
    <div className="w-[500px]">
      <MultiSelect
        options={deviceOptions}
        placeholder="Select devices"
        onValueChange={(values) => console.log("Selected values:", values)}
      />
    </div>
  ),
};
