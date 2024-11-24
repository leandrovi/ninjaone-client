import React from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Device } from "@/lib/mock-data";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { deviceTypeOptions } from "@/constants/device-types";
import { cn } from "@/lib/utils";

interface DeviceDialogProps {
  mode: "edit" | "create" | "delete";
  device?: Device;
  children: React.ReactNode;
}

export const DeviceDialog = ({ mode, device, children }: DeviceDialogProps) => {
  const getDialogTitle = () => {
    if (mode === "edit") return "Edit device";
    if (mode === "create") return "Add device";
    if (mode === "delete") return "Delete device?";
  };

  return (
    <Dialog>
      {children}
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>{getDialogTitle()}</DialogTitle>
        </DialogHeader>

        {mode === "delete" ? (
          <p className="text-sm font-light">
            You are about to delete the device <span className="font-normal">{device?.system_name}</span>. This action
            cannot be undone.
          </p>
        ) : (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="system">System name *</Label>
              <Input id="system" defaultValue={device?.system_name} />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="type">Device type *</Label>
              <Select defaultValue={device?.type}>
                <SelectTrigger className="w-fulls">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {deviceTypeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="hdd">HDD capacity (GB) *</Label>
              <Input id="hdd" defaultValue={device?.hdd_capacity} />
            </div>
          </div>
        )}

        <DialogFooter className="mt-2 gap-2 md:gap-1">
          <DialogClose asChild>
            <Button
              variant="outline"
              className={cn(
                "font-normal border-outline/25 !py-[11px] hover:border-outline/25 hover:bg-muted",
                mode === "delete" ? "hover:text-foreground" : "text-primary hover:text-primary",
              )}
            >
              Cancel
            </Button>
          </DialogClose>

          <Button
            type="submit"
            className={cn("font-normal", mode === "delete" && "bg-destructive hover:bg-destructive/90")}
          >
            {mode === "delete" ? "Delete" : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
