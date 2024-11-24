import type { Meta, StoryObj } from "@storybook/react";
import { DeviceDeleteDialog } from "./device-delete-dialog";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog/dialog";
import { Button } from "@/components/ui/button/button";

const meta: Meta<typeof DeviceDeleteDialog> = {
  title: "Devices/DeviceDeleteDialog",
  component: DeviceDeleteDialog,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="destructive">Delete</Button>
        </DialogTrigger>
        <DialogContent>
          <Story />
        </DialogContent>
      </Dialog>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DeviceDeleteDialog>;

export const Default: Story = {
  args: {
    device: {
      id: "1",
      system_name: "Test Device",
      type: "WINDOWS",
      hdd_capacity: "500",
    },
    onDelete: async () => console.log("Delete clicked"),
  },
};

export const Deleting: Story = {
  args: {
    device: {
      id: "1",
      system_name: "Test Device",
      type: "WINDOWS",
      hdd_capacity: "500",
    },
    onDelete: async () => console.log("Delete clicked"),
    isDeleting: true,
  },
};
