import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useDevices } from "./useDevices";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Device } from "@/types/device";
import * as api from "@/services/api";

vi.mock("@/services/api", () => ({
  fetchDevices: vi.fn(),
  createDevice: vi.fn(),
  updateDevice: vi.fn(),
  deleteDevice: vi.fn(),
}));

const mockDevices: Device[] = [
  {
    id: "1",
    system_name: "Windows PC",
    type: "WINDOWS",
    hdd_capacity: "500",
  },
  {
    id: "2",
    system_name: "Mac Laptop",
    type: "MAC",
    hdd_capacity: "1000",
  },
  {
    id: "3",
    system_name: "Linux Server",
    type: "LINUX",
    hdd_capacity: "2000",
  },
];

describe("useDevices", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("fetches and returns devices", async () => {
    vi.mocked(api.fetchDevices).mockResolvedValue(mockDevices);

    const { result } = renderHook(() => useDevices({}), { wrapper });

    await waitFor(() => {
      expect(result.current.devices.sort((a, b) => a.id.localeCompare(b.id))).toEqual(
        mockDevices.sort((a, b) => a.id.localeCompare(b.id)),
      );
    });
    expect(result.current.isLoading).toBe(false);
  });

  it("filters devices by search term", async () => {
    vi.mocked(api.fetchDevices).mockResolvedValue(mockDevices);

    const { result } = renderHook(() => useDevices({ search: "linux" }), { wrapper });

    await waitFor(() => {
      expect(result.current.devices).toHaveLength(1);
      expect(result.current.devices[0].system_name).toBe("Linux Server");
    });
  });

  it("filters devices by device type", async () => {
    vi.mocked(api.fetchDevices).mockResolvedValue(mockDevices);

    const { result } = renderHook(() => useDevices({ deviceTypes: ["WINDOWS"] }), { wrapper });

    await waitFor(() => {
      expect(result.current.devices).toHaveLength(1);
      expect(result.current.devices[0].type).toBe("WINDOWS");
    });
  });

  it("sorts devices by system name", async () => {
    vi.mocked(api.fetchDevices).mockResolvedValue(mockDevices);

    const { result } = renderHook(() => useDevices({ sortBy: "system_name", sortDirection: "desc" }), { wrapper });

    await waitFor(() => {
      expect(result.current.devices[0].system_name).toBe("Windows PC");
      expect(result.current.devices[2].system_name).toBe("Linux Server");
    });
  });

  it("creates a new device", async () => {
    const newDevice: Device = {
      id: "4",
      system_name: "New Device",
      type: "WINDOWS",
      hdd_capacity: "500",
    };

    vi.mocked(api.fetchDevices).mockResolvedValue(mockDevices);
    vi.mocked(api.createDevice).mockResolvedValue(newDevice);

    const { result } = renderHook(() => useDevices({}), { wrapper });
    await result.current.createDevice({
      system_name: "New Device",
      type: "WINDOWS",
      hdd_capacity: "500",
    });

    expect(api.createDevice).toHaveBeenCalledWith({
      system_name: "New Device",
      type: "WINDOWS",
      hdd_capacity: "500",
    });
  });

  it("updates an existing device", async () => {
    const updatedDevice: Device = {
      ...mockDevices[0],
      system_name: "Updated Device",
    };

    vi.mocked(api.fetchDevices).mockResolvedValue(mockDevices);
    vi.mocked(api.updateDevice).mockResolvedValue(updatedDevice);

    const { result } = renderHook(() => useDevices({}), { wrapper });
    await result.current.updateDevice("1", {
      system_name: "Updated Device",
      type: "WINDOWS",
      hdd_capacity: "500",
    });

    expect(api.updateDevice).toHaveBeenCalledWith("1", {
      system_name: "Updated Device",
      type: "WINDOWS",
      hdd_capacity: "500",
    });
  });

  it("deletes a device", async () => {
    vi.mocked(api.fetchDevices).mockResolvedValue(mockDevices);
    vi.mocked(api.deleteDevice).mockResolvedValue("1");

    const { result } = renderHook(() => useDevices({}), { wrapper });
    await result.current.deleteDevice("1");

    expect(api.deleteDevice).toHaveBeenCalledWith("1");
  });

  it("handles loading states correctly", async () => {
    vi.mocked(api.fetchDevices).mockResolvedValue(mockDevices);

    const { result } = renderHook(() => useDevices({}), { wrapper });
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });
});
