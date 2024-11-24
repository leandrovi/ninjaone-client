import * as React from "react";
import { MoreHorizontal } from "lucide-react";

import WindowsIcon from "@/assets/icons/windows.svg";
import MacIcon from "@/assets/icons/mac.svg";
import LinuxIcon from "@/assets/icons/linux.svg";
import type { Device } from "@/lib/mock-data";

import { Button } from "@/components/ui/button/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table/table";
import { DialogTrigger } from "@/components/ui/dialog/dialog";

import { DeviceDialog } from "../device-dialog/device-dialog";

interface DeviceListItemProps {
  device: Device;
}

const SystemIcon: React.FC<{ system: Device["type"] }> = ({ system }) => {
  switch (system) {
    case "WINDOWS":
      return <img src={WindowsIcon} alt="Windows" className="h-4 w-3.5 text-ring" />;
    case "MAC":
      return <img src={MacIcon} alt="Mac" className="h-3.5 w-[11px] text-ring" />;
    case "LINUX":
      return <img src={LinuxIcon} alt="Linux" className="h-4 w-3.5 text-ring" />;
    default:
      return null;
  }
};

export const DeviceListItem: React.FC<DeviceListItemProps> = ({ device }) => {
  const [dialogMode, setDialogMode] = React.useState<"edit" | "delete">("edit");

  return (
    <TableRow className="group hover:bg-muted/50 has-[button[data-state=open]]:bg-muted/50 border-b-border-foreground">
      <TableCell>
        <div className="flex flex-col gap-[5px]">
          <div className="flex items-center gap-[5px]">
            <div className="flex items-center justify-center w-3.5">
              <SystemIcon system={device.type} />
            </div>
            <span className="text-foreground text-sm font-medium">{device.system_name}</span>
          </div>
          <p className="text-muted-foreground text-xs leading-none">
            <span className="capitalize">{device.type.toLowerCase()}</span> workstation - {device.hdd_capacity} GB
          </p>
        </div>
      </TableCell>
      <TableCell align="right">
        <DeviceDialog mode={dialogMode} device={device}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="md:invisible group-hover:visible data-[state=open]:visible data-[state=open]:bg-muted h-8 w-8 p-0 hover:bg-muted"
              >
                <MoreHorizontal className="h-4 w-4 text-ring" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DialogTrigger asChild>
                <DropdownMenuItem className="cursor-pointer" onClick={() => setDialogMode("edit")}>
                  Edit
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogTrigger asChild>
                <DropdownMenuItem className="cursor-pointer text-destructive" onClick={() => setDialogMode("delete")}>
                  Delete
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
        </DeviceDialog>
      </TableCell>
    </TableRow>
  );
};
