import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchDevices, createDevice, updateDevice, UpdateDevicePayload, deleteDevice } from "@/services/api";
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
  const queryClient = useQueryClient();

  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["devices"],
    queryFn: fetchDevices,
    placeholderData: (previousData) => previousData,
    staleTime: 5 * 60 * 1000,
  });

  const createDeviceMutation = useMutation({
    mutationFn: createDevice,
    onSuccess: async (newDevice) => {
      queryClient.setQueryData<Device[]>(["devices"], (oldData = []) => {
        return [...oldData, newDevice];
      });

      await queryClient.invalidateQueries({ queryKey: ["devices"] });
    },
  });

  const updateDeviceMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateDevicePayload }) => updateDevice(id, data),
    onSuccess: (updatedDevice) => {
      queryClient.setQueryData<Device[]>(["devices"], (old = []) =>
        old.map((device) => (device.id === updatedDevice.id ? updatedDevice : device)),
      );
      queryClient.invalidateQueries({ queryKey: ["devices"] });
    },
  });

  const deleteDeviceMutation = useMutation({
    mutationFn: async (id: string) => deleteDevice(id),
    onSuccess: (deletedId) => {
      queryClient.setQueryData<Device[]>(["devices"], (old = []) => old.filter((device) => device.id !== deletedId));
      queryClient.invalidateQueries({ queryKey: ["devices"] });
    },
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
    createDevice: (device: Omit<Device, "id">) => {
      return createDeviceMutation.mutateAsync(device);
    },
    updateDevice: (id: string, data: UpdateDevicePayload) => {
      return updateDeviceMutation.mutateAsync({ id, data });
    },
    deleteDevice: (id: string) => {
      return deleteDeviceMutation.mutateAsync(id);
    },
    isCreating: createDeviceMutation.isPending,
    isUpdating: updateDeviceMutation.isPending,
    isDeleting: deleteDeviceMutation.isPending,
  };
};
