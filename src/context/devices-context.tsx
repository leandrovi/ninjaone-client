import { createContext, useContext, ReactNode, useState } from "react";
import { useDevices } from "@/hooks/useDevices";
import { Device } from "@/types/device";

type DevicesContextType = {
  search: string;
  setSearch: (search: string) => void;
  deviceTypes: string[];
  setDeviceTypes: (types: string[]) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  sortDirection: "asc" | "desc";
  setSortDirection: (direction: "asc" | "desc") => void;
  devices: Device[];
  isLoading: boolean;
  refetch: () => void;
};

const DevicesContext = createContext<DevicesContextType | undefined>(undefined);

export const DevicesProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState("");
  const [deviceTypes, setDeviceTypes] = useState<string[]>(["all"]);
  const [sortBy, setSortBy] = useState("system_name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const { devices, isLoading, refetch } = useDevices({
    search,
    deviceTypes,
    sortBy,
    sortDirection,
  });

  const handleSetSearch = (newSearch: string) => {
    setSearch(newSearch.trim());
  };

  const handleSetDeviceTypes = (newTypes: string[]) => {
    setDeviceTypes(newTypes.length === 0 ? ["all"] : newTypes);
  };

  return (
    <DevicesContext.Provider
      value={{
        search,
        setSearch: handleSetSearch,
        deviceTypes,
        setDeviceTypes: handleSetDeviceTypes,
        sortBy,
        setSortBy,
        sortDirection,
        setSortDirection,
        devices,
        isLoading,
        refetch,
      }}
    >
      {children}
    </DevicesContext.Provider>
  );
};

export const useDevicesContext = () => {
  const context = useContext(DevicesContext);
  if (!context) {
    throw new Error("useDevicesContext must be used within a DevicesProvider");
  }
  return context;
};
