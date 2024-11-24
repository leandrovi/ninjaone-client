import * as React from "react";
import { useDevicesContext } from "@/context/devices-context";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table/table";
import { DeviceListItem } from "../device-list-item/device-list-item";
import { Skeleton } from "@/components/ui/skeleton/skeleton";

export const DeviceList: React.FC = () => {
  const { devices, isLoading } = useDevicesContext();

  if (isLoading) {
    return (
      <Table className="w-full">
        <TableHeader>
          <TableRow className="border-b-border-secondary">
            <TableHead className="text-left py-2">Device</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 10 }).map((_, index) => (
            <TableRow
              key={index}
              className="group hover:bg-muted/50 has-[button[data-state=open]]:bg-muted/50 border-b-border-foreground"
            >
              <TableCell className="py-4">
                <Skeleton className="h-5 rounded" style={{ width: Math.floor(Math.random() * 200) + 200 }} />
              </TableCell>
              <TableCell align="right">
                <Skeleton className="h-6 w-6 rounded" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow className="border-b-border-secondary">
          <TableHead className="text-left py-2">Device</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {devices.map((device) => (
          <DeviceListItem key={device.id} device={device} />
        ))}
      </TableBody>
    </Table>
  );
};
