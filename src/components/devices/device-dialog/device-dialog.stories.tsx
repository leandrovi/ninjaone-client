import type { Meta, StoryObj } from "@storybook/react";
import { DeviceDialog } from "./device-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import PlusIcon from "@/assets/icons/plus.svg";

const meta = {
  title: "Components/Devices/DeviceDialog",
  component: DeviceDialog,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <Dialog>
        <Story />
      </Dialog>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof DeviceDialog>;

export default meta;

type Story = StoryObj<typeof DeviceDialog>;

export const CreateNew: Story = {
  args: {
    mode: "create",
    children: (
      <DialogTrigger asChild>
        <Button variant="default" className="font-normal">
          <img src={PlusIcon} alt="Plus" className="h-3.5 w-3" />
          Add device
        </Button>
      </DialogTrigger>
    ),
  },
};

export const EditWindows: Story = {
  args: {
    mode: "edit",
    device: {
      id: "1",
      type: "WINDOWS",
      system_name: "Windows Workstation",
      hdd_capacity: "256",
    },
    children: (
      <DialogTrigger asChild>
        <Button>Edit Device</Button>
      </DialogTrigger>
    ),
  },
};

export const EditMac: Story = {
  args: {
    mode: "edit",
    device: {
      id: "2",
      type: "MAC",
      system_name: "MacBook Pro",
      hdd_capacity: "512",
    },
    children: (
      <DialogTrigger asChild>
        <Button>Edit Device</Button>
      </DialogTrigger>
    ),
  },
};
