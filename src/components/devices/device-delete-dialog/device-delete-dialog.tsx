import { useState } from "react";
import { Device } from "@/types/device";
import { useToast } from "@/hooks/use-toast";
import { DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog/dialog";
import { Button } from "@/components/ui/button/button";

interface DeviceDeleteDialogProps {
  device: Device;
  onDelete: () => Promise<void>;
  isDeleting?: boolean;
  error?: string | null;
}

export const DeviceDeleteDialog = ({ device, onDelete, isDeleting, error: initialError }: DeviceDeleteDialogProps) => {
  const [error, setError] = useState<string | null>(initialError ?? null);
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      setError(null);
      await onDelete();
      toast({
        title: "Success",
        description: "Device deleted successfully",
        variant: "default",
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to delete device");
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete device?</DialogTitle>
      </DialogHeader>
      <p className="text-sm font-light">
        You are about to delete the device <span className="font-normal">{device.system_name}</span>. This action cannot
        be undone.
      </p>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <DialogFooter className="mt-2 gap-2 md:gap-1">
        <DialogClose asChild>
          <Button
            type="button"
            variant="outline"
            className="font-normal border-outline/25 !py-[11px] hover:border-outline/25 hover:bg-muted hover:text-foreground"
          >
            Cancel
          </Button>
        </DialogClose>
        <Button
          onClick={handleDelete}
          disabled={isDeleting}
          className="font-normal bg-destructive hover:bg-destructive/90"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
