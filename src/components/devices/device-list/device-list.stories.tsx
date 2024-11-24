import type { Meta, StoryObj } from "@storybook/react";
import { DeviceList } from "./device-list";

const meta: Meta<typeof DeviceList> = {
  title: "Devices/DeviceList",
  component: DeviceList,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "100%", background: "#ffffff", padding: "0 20px" }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DeviceList>;

export const Default: Story = {};
