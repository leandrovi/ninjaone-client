import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRef } from "react";

import { useToast } from "@/hooks/use-toast";
import { Device } from "@/lib/mock-data";
import { useDevicesContext } from "@/context/devices-context";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog/dialog";
import { DeviceDeleteDialog } from "../device-delete-dialog/device-delete-dialog";
import { DeviceFormDialog } from "../device-form-dialog/device-form-dialog";

const deviceSchema = z.object({
  system_name: z.string().min(1, "System name is required"),
  type: z.enum(["WINDOWS", "LINUX", "MAC"], {
    errorMap: () => ({ message: "Device type is required" }),
  }),
  hdd_capacity: z.string().min(1, "HDD capacity is required").regex(/^\d+$/, "Must be a number"),
});

type DeviceFormData = z.infer<typeof deviceSchema>;

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

  const form = useForm<DeviceFormData>({
    resolver: zodResolver(deviceSchema),
    defaultValues: {
      system_name: device?.system_name || "",
      type: device?.type || undefined,
      hdd_capacity: device?.hdd_capacity || "",
    },
  });

  const getDialogTitle = () => {
    if (mode === "edit") return "Edit device";
    if (mode === "create") return "Add device";
    if (mode === "delete") return "Delete device?";
  };

  const isSubmitting = isCreating || isUpdating;

  const handleMutate = async (values: DeviceFormData) => {
    if (!device) return;

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
        await updateDevice(device.id, values);

        toast({
          title: `${values.system_name} updated`,
          description: "Device updated successfully",
          variant: "default",
        });
      }
      closeRef.current?.click();
      form.reset();
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
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>{getDialogTitle()}</DialogTitle>
        </DialogHeader>

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
      </DialogContent>
    </Dialog>
  );
};
