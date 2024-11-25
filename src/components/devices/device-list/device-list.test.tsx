import { render, screen } from "@testing-library/react";
import { DeviceList } from "./device-list";
import { useDevicesContext } from "@/context/devices-context";
import { vi } from "vitest";
import { Device } from "@/types/device";

vi.mock("@/context/devices-context", () => ({
  useDevicesContext: vi.fn(),
}));

vi.mock("../device-list-item/device-list-item", () => ({
  DeviceListItem: ({ device }: { device: { id: string; system_name: string } }) => (
    <div data-testid={`device-item-${device.id}`}>{device.system_name}</div>
  ),
}));

const mockDevices: Device[] = [
  {
    id: "1",
    system_name: "Device 1",
    type: "WINDOWS",
    hdd_capacity: "500",
  },
  {
    id: "2",
    system_name: "Device 2",
    type: "LINUX",
    hdd_capacity: "1000",
  },
  {
    id: "3",
    system_name: "Device 3",
    type: "MAC",
    hdd_capacity: "250",
  },
];

const defaultContextValue = {
  search: "",
  setSearch: vi.fn(),
  deviceTypes: ["all"],
  setDeviceTypes: vi.fn(),
  sortBy: "system_name",
  setSortBy: vi.fn(),
  sortDirection: "asc" as const,
  setSortDirection: vi.fn(),
  devices: mockDevices,
  isLoading: false,
  refetch: vi.fn(),
  createDevice: vi.fn(),
  updateDevice: vi.fn(),
  deleteDevice: vi.fn(),
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
};

describe("DeviceList", () => {
  it("renders loading skeletons when isLoading is true", () => {
    vi.mocked(useDevicesContext).mockReturnValue({
      ...defaultContextValue,
      devices: [],
      isLoading: true,
    });

    render(<DeviceList />);

    const skeletons = screen.getAllByRole("row");
    expect(skeletons).toHaveLength(11);
  });

  it("renders devices when data is loaded", () => {
    vi.mocked(useDevicesContext).mockReturnValue(defaultContextValue);

    render(<DeviceList />);

    mockDevices.forEach((device) => {
      expect(screen.getByTestId(`device-item-${device.id}`)).toBeInTheDocument();
    });
  });

  it("renders the correct table headers", () => {
    vi.mocked(useDevicesContext).mockReturnValue(defaultContextValue);

    render(<DeviceList />);

    expect(screen.getByRole("columnheader", { name: "Device" })).toBeInTheDocument();
  });
});
