import type { Meta, StoryObj } from "@storybook/react";
import { InputWithIcon } from "./input-with-icon";

const meta = {
  title: "UI/InputWithIcon",
  component: InputWithIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof InputWithIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Input: Story = {
  args: {
    icon: "../src/assets/icons/search.svg",
    alt: "Search icon",
    placeholder: "Search...",
    type: "search",
  },
};

export const DisabledInput: Story = {
  args: {
    icon: "../src/assets/icons/search.svg",
    alt: "Search icon",
    placeholder: "Search...",
    disabled: true,
  },
};

export const WithValue: Story = {
  args: {
    icon: "../src/assets/icons/search.svg",
    alt: "Search icon",
    placeholder: "Search...",
    defaultValue: "Lorem ipsum dolor sit amet",
  },
};
