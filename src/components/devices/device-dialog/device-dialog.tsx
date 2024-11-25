import * as React from "react";
import { useRef } from "react";

import { useToast } from "@/hooks/use-toast";
import { Device } from "@/types/device";
import { useDevicesContext } from "@/context/devices-context";

import { Dialog } from "@/components/ui/dialog/dialog";
import { DeviceDeleteDialog } from "../device-delete-dialog/device-delete-dialog";
import { DeviceFormDialog } from "../device-form-dialog/device-form-dialog";
import { DeviceFormData } from "@/lib/validations/device";

interface DeviceDialogProps {
  mode: "edit" | "create" | "delete";
  device?: Device;
  children: React.ReactNode;
}

export const DeviceDialog: React.FC<DeviceDialogProps> = ({ mode, device, children }) => {
  const { createDevice, updateDevice, deleteDevice, isCreating, isUpdating, isDeleting } = useDevicesContext();
  const { toast } = useToast();

  const closeRef = useRef<HTMLButtonElement>(null);
  const [error, setError] = React.useState<string | null>(null);

  const isSubmitting = isCreating || isUpdating;

  const handleMutate = async (values: DeviceFormData) => {
    try {
      setError(null);

      if (mode === "create") {
        await createDevice(values);

        toast({
          title: `${values.system_name} created`,
          description: "Device created successfully",
          variant: "default",
        });
      } else if (mode === "edit") {
        if (!device) return;

        await updateDevice(device.id, values);

        toast({
          title: `${values.system_name} updated`,
          description: "Device updated successfully",
          variant: "default",
        });
      }
      closeRef.current?.click();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to create device");
    }
  };

  const handleDelete = async () => {
    if (!device) return;

    try {
      setError(null);
      await deleteDevice(device.id);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to delete device");
    }
  };

  return (
    <Dialog>
      {children}

      {mode === "delete" && device ? (
        <DeviceDeleteDialog device={device} onDelete={handleDelete} isDeleting={isDeleting} error={error} />
      ) : (
        <DeviceFormDialog
          mode={mode as "edit" | "create"}
          device={device}
          onSubmit={handleMutate}
          isSubmitting={isSubmitting}
          error={error}
        />
      )}
    </Dialog>
  );
};
