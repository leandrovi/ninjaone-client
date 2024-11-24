import { useQuery } from "@tanstack/react-query";
import { fetchDevices } from "@/services/api";
import { Device } from "@/types/device";
import { useMemo } from "react";

export const useDevices = ({
  search = "",
  deviceTypes = ["all"],
  sortBy = "system_name",
  sortDirection = "asc",
}: {
  search?: string;
  deviceTypes?: string[];
  sortBy?: string;
  sortDirection?: "asc" | "desc";
}) => {
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["devices"],
    queryFn: fetchDevices,
    placeholderData: (previousData) => previousData,
  });

  const filteredAndSortedDevices = useMemo(() => {
    let result = [...data];

    if (deviceTypes.length > 0 && !deviceTypes.includes("all")) {
      result = result.filter((device) =>
        deviceTypes.map((type) => type.toLowerCase()).includes(device.type.toLowerCase()),
      );
    }

    if (search.trim()) {
      const searchLower = search.toLowerCase().trim();
      result = result.filter(
        (device) =>
          device.system_name.toLowerCase().includes(searchLower) ||
          device.type.toLowerCase().includes(searchLower) ||
          device.hdd_capacity.toLowerCase().includes(searchLower),
      );
    }

    result.sort((a, b) => {
      const aValue = String(a[sortBy as keyof Device]).toLowerCase();
      const bValue = String(b[sortBy as keyof Device]).toLowerCase();

      if (sortBy === "hdd_capacity") {
        return sortDirection === "asc" ? Number(aValue) - Number(bValue) : Number(bValue) - Number(aValue);
      }

      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });

    return result;
  }, [data, search, deviceTypes, sortBy, sortDirection]);

  return {
    devices: filteredAndSortedDevices,
    isLoading,
    refetch,
  };
};
