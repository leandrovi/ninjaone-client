import { FC } from "react";

import PlusIcon from "../../../assets/icons/plus.svg";
import { Button } from "../../ui/button";

export const DeviceListHeader: FC = () => {
  return (
    <div className="flex justify-between items-center py-6 w-full">
      <h1 className="text-xl font-medium text-foreground">Devices</h1>
      <Button variant="default" className="font-normal">
        <img src={PlusIcon} alt="Plus" className="h-3.5 w-3" />
        Add device
      </Button>
    </div>
  );
};
