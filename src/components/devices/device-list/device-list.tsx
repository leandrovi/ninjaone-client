import * as React from "react";

import { mockDevices } from "@/lib/mock-data";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table/table";

import { DeviceListItem } from "../device-list-item/device-list-item";

export const DeviceList: React.FC = () => {
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
