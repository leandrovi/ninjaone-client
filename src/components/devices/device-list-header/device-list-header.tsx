import { FC } from "react";
import { Plus } from "lucide-react";

import { Button } from "../../ui/button";

export const DeviceListHeader: FC = () => {
  return (
    <div className="flex justify-between items-center py-6 w-full">
      <h1 className="text-xl font-medium text-foreground">Devices</h1>
      <Button variant="default">
        <Plus className="w-4 h-5" />
        Add device
      </Button>
    </div>
  );
};
