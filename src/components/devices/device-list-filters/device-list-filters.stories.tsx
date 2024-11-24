import type { Meta, StoryObj } from "@storybook/react";
import { DeviceListFilters } from "./device-list-filters";

const meta: Meta<typeof DeviceListFilters> = {
  title: "Devices/DeviceListFilters",
  component: DeviceListFilters,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "100%", background: "#ffffff", padding: "20px" }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DeviceListFilters>;

export const Default: Story = {};
