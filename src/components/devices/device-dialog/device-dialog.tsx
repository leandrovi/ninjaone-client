import React from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Device } from "@/lib/mock-data";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { deviceTypeOptions } from "@/constants/device-types";

interface DeviceDialogProps {
  mode: "edit" | "create";
  device?: Device;
  children: React.ReactNode;
}

export const DeviceDialog = ({ mode, device, children }: DeviceDialogProps) => {
  return (
    <Dialog>
      {children}
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>{mode === "edit" ? "Edit device" : "Add device"}</DialogTitle>
        </DialogHeader>

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

        <DialogFooter className="mt-2 gap-2 md:gap-1">
          <Button
            variant="outline"
            className="font-normal border-outline/25 hover:border-primary text-primary hover:bg-primary hover:text-primary-foreground !py-[11px]"
          >
            Cancel
          </Button>
          <Button type="submit" className="font-normal">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
