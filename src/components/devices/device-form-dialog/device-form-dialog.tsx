import { useRef, useState } from "react";

import { Device } from "@/types/device";
import { useToast } from "@/hooks/use-toast";
import type { DeviceFormData } from "@/lib/validations/device";

import { DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog/dialog";
import { DeviceForm } from "../device-form/device-form";

interface DeviceFormDialogProps {
  mode: "edit" | "create";
  device?: Device;
  onSubmit: (values: DeviceFormData) => Promise<void>;
  isSubmitting?: boolean;
  error: string | null;
}

export const DeviceFormDialog = ({
  mode,
  device,
  onSubmit,
  isSubmitting,
  error: initialError,
}: DeviceFormDialogProps) => {
  const { toast } = useToast();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [error, setError] = useState<string | null>(initialError);

  const handleSubmit = async (values: DeviceFormData) => {
    try {
      setError(null);
      await onSubmit(values);
      toast({
        title: "Success",
        description: `Device ${mode === "create" ? "created" : "updated"} successfully`,
        variant: "default",
      });
      closeRef.current?.click();
    } catch (error) {
      setError(error instanceof Error ? error.message : `Failed to ${mode} device`);
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{mode === "create" ? "Add device" : "Edit device"}</DialogTitle>
      </DialogHeader>
      <DeviceForm
        device={device}
        onSubmit={handleSubmit}
        onCancel={() => closeRef.current?.click()}
        isSubmitting={isSubmitting}
        error={error}
      />
      <DialogClose ref={closeRef} className="hidden" />
    </DialogContent>
  );
};
