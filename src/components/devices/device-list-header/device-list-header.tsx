import * as React from "react";

import PlusIcon from "@/assets/icons/plus.svg";
import { DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { DeviceDialog } from "../device-dialog/device-dialog";

export const DeviceListHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center py-6 w-full">
      <h1 className="text-xl font-medium text-foreground">Devices</h1>
      <DeviceDialog mode="create">
        <DialogTrigger asChild>
          <Button variant="default" className="font-normal">
            <img src={PlusIcon} alt="Plus" className="h-3.5 w-3" />
            Add device
          </Button>
        </DialogTrigger>
      </DeviceDialog>
    </div>
  );
};
