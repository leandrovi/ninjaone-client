import { FC } from "react";
import { mockDevices } from "../../../lib/mock-data";
import { DeviceListItem } from "../device-list-item/device-list-item";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "../../ui/table";

export const DeviceList: FC = () => {
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow className="border-b-border-secondary">
          <TableHead className="text-left py-2">Device</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockDevices.map((device) => (
          <DeviceListItem key={device.id} device={device} onEdit={() => {}} onDelete={() => {}} />
        ))}
      </TableBody>
    </Table>
  );
};
