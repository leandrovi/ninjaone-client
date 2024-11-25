import { fireEvent, render, screen, within } from "../../../../tests/test-utils";
import { DeviceListFilters } from "./device-list-filters";
import { useDevicesContext } from "@/context/devices-context";
import { vi } from "vitest";
import { createMockPointerEvent } from "../../../../tests/__mocks__/mockPointerEvent";

vi.mock("@/assets/icons/dropdown.svg", () => ({ default: "dropdown-icon.svg" }));
vi.mock("@/assets/icons/search.svg", () => ({ default: "search-icon.svg" }));
vi.mock("@/assets/icons/sync.svg", () => ({ default: "sync-icon.svg" }));

vi.mock("@/components/ui/multi-select/multi-select", () => ({
  MultiSelect: ({
    onValueChange,
    defaultValue,
  }: {
    onValueChange: (value: string[]) => void;
    defaultValue: string[];
  }) => (
    <div data-testid="mock-multi-select">
      <button onClick={() => onValueChange(["WINDOWS"])}>Select Types ({defaultValue.join(", ")})</button>
    </div>
  ),
}));

const mockSetSearch = vi.fn();
const mockSetDeviceTypes = vi.fn();
const mockSetSortBy = vi.fn();
const mockSetSortDirection = vi.fn();
const mockRefetch = vi.fn();

const defaultContextValue = {
  search: "",
  setSearch: mockSetSearch,
  deviceTypes: ["all"],
  setDeviceTypes: mockSetDeviceTypes,
  sortBy: "system_name",
  setSortBy: mockSetSortBy,
  sortDirection: "asc" as const,
  setSortDirection: mockSetSortDirection,
  devices: [],
  isLoading: false,
  refetch: mockRefetch,
  createDevice: vi.fn(),
  updateDevice: vi.fn(),
  deleteDevice: vi.fn(),
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
};

vi.mock("@/context/devices-context", () => ({
  useDevicesContext: vi.fn(() => defaultContextValue),
  DevicesProvider: ({ children }: { children: React.ReactNode }) => children,
}));

vi.mock("@/components/ui/popover/popover", () => ({
  Popover: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  PopoverTrigger: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  PopoverContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe("DeviceListFilters", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const setupPointerEventMocks = () => {
    window.PointerEvent = createMockPointerEvent as any;
    Object.assign(window.HTMLElement.prototype, {
      scrollIntoView: vi.fn(),
      releasePointerCapture: vi.fn(),
      hasPointerCapture: vi.fn(),
    });
  };

  it("renders search input and handles changes", () => {
    render(<DeviceListFilters />);

    const searchInput = screen.getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "test search" } });

    expect(mockSetSearch).toHaveBeenCalledWith("test search");
  });

  it("handles device type selection through MultiSelect", () => {
    render(<DeviceListFilters />);

    const multiSelect = screen.getByTestId("mock-multi-select");
    const selectButton = within(multiSelect).getByRole("button");
    fireEvent.click(selectButton);

    expect(useDevicesContext().setDeviceTypes).toHaveBeenCalledWith(["WINDOWS"]);
  });

  it("handles sort by selection", () => {
    setupPointerEventMocks();
    render(<DeviceListFilters />);

    const sortButton = screen.getByText(/Sort by:/);
    fireEvent.click(sortButton);

    const systemNameOption = screen.getByText("System Name");
    fireEvent.click(systemNameOption);

    expect(mockSetSortBy).toHaveBeenCalledWith("system_name");
  });

  it("handles sort direction change", () => {
    setupPointerEventMocks();
    render(<DeviceListFilters />);

    const sortButton = screen.getByText(/Sort by:/);
    fireEvent.pointerDown(sortButton);

    const descButton = screen.getByText("DESC");
    fireEvent.click(descButton);

    expect(useDevicesContext().setSortDirection).toHaveBeenCalledWith("desc");
  });

  it("resets filters when sync button is clicked", () => {
    render(<DeviceListFilters />);

    const syncButton = screen.getByRole("button", { name: /Sync/i });
    fireEvent.click(syncButton);

    expect(useDevicesContext().setDeviceTypes).toHaveBeenCalledWith(["all"]);
    expect(useDevicesContext().setSortBy).toHaveBeenCalledWith("system_name");
    expect(useDevicesContext().setSortDirection).toHaveBeenCalledWith("asc");
    expect(useDevicesContext().setSearch).toHaveBeenCalledWith("");
    expect(useDevicesContext().refetch).toHaveBeenCalled();
  });

  it("displays current sort selection", () => {
    vi.mocked(useDevicesContext).mockImplementation(() => ({
      ...defaultContextValue,
      sortBy: "hdd_capacity",
      sortDirection: "desc" as const,
    }));

    render(<DeviceListFilters />);

    expect(screen.getByText("Sort by: HDD Capacity (Descending)")).toBeInTheDocument();
  });
});
