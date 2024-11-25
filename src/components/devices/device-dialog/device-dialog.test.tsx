import { render, screen, waitFor } from "../../../../tests/test-utils";
import userEvent from "@testing-library/user-event";
import { describe, it, beforeEach, vi, expect } from "vitest";
import { DeviceDialog } from "./device-dialog";
import { Device } from "../../../types/device";
import { Dialog, DialogTrigger } from "@/components/ui/dialog/dialog";
import { Button } from "@/components/ui/button/button";
import * as DevicesContext from "@/context/devices-context";

vi.mock("../device-form-dialog/device-form-dialog", () => ({
  DeviceFormDialog: ({ onSubmit }: any) => (
    <div data-testid="mock-form-dialog">
      <button onClick={() => onSubmit({ system_name: "Test Device", type: "WINDOWS", hdd_capacity: "500" })}>
        Submit Form
      </button>
    </div>
  ),
}));

vi.mock("../device-delete-dialog/device-delete-dialog", () => ({
  DeviceDeleteDialog: ({ onDelete }: any) => (
    <div data-testid="mock-delete-dialog">
      <button onClick={onDelete}>Delete Device</button>
    </div>
  ),
}));

vi.mock("@/hooks/use-toast", () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}));

describe("DeviceDialog", () => {
  const mockDevice: Device = {
    id: "1",
    system_name: "Test Device",
    type: "WINDOWS",
    hdd_capacity: "500",
  };

  const mockContextValue = {
    // Mutation methods
    createDevice: vi.fn(),
    updateDevice: vi.fn(),
    deleteDevice: vi.fn(),

    // Loading states
    isCreating: false,
    isUpdating: false,
    isDeleting: false,
    isLoading: false,

    // Search and filter state
    search: "",
    setSearch: vi.fn(),
    deviceTypes: [],
    setDeviceTypes: vi.fn(),

    // Data
    devices: [],
    filteredDevices: [],

    // Sort state
    sortConfig: { key: null, direction: "asc" },
    setSortConfig: vi.fn(),
    sortBy: "Type",
    setSortBy: vi.fn(),
    sortDirection: "asc" as "asc" | "desc",
    setSortDirection: vi.fn(),
    refetch: vi.fn(),

    // Error state
    error: null,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(DevicesContext, "useDevicesContext").mockReturnValue(mockContextValue);
  });

  const renderDialog = (mode: "edit" | "create" | "delete", device?: Device) => {
    return render(
      <Dialog>
        <DeviceDialog mode={mode} device={device}>
          <DialogTrigger asChild>
            <Button>Trigger</Button>
          </DialogTrigger>
        </DeviceDialog>
      </Dialog>,
    );
  };

  it("renders form dialog in create mode", async () => {
    renderDialog("create");

    const triggerButton = screen.getByText(/trigger/i);
    await userEvent.click(triggerButton);

    expect(screen.getByTestId("mock-form-dialog")).toBeInTheDocument();
  });

  it("renders form dialog in edit mode", async () => {
    renderDialog("edit", mockDevice);

    const triggerButton = screen.getByText(/trigger/i);
    await userEvent.click(triggerButton);

    expect(screen.getByTestId("mock-form-dialog")).toBeInTheDocument();
  });

  it("renders delete dialog in delete mode", async () => {
    renderDialog("delete", mockDevice);

    const triggerButton = screen.getByText(/trigger/i);
    await userEvent.click(triggerButton);

    expect(screen.getByTestId("mock-delete-dialog")).toBeInTheDocument();
  });

  it("calls createDevice when form is submitted in create mode", async () => {
    renderDialog("create");

    const triggerButton = screen.getByText(/trigger/i);
    await userEvent.click(triggerButton);

    const submitButton = screen.getByText(/submit form/i);
    await userEvent.click(submitButton);

    expect(mockContextValue.createDevice).toHaveBeenCalledWith({
      system_name: "Test Device",
      type: "WINDOWS",
      hdd_capacity: "500",
    });
  });

  it("calls updateDevice when form is submitted in edit mode", async () => {
    renderDialog("edit", mockDevice);

    const triggerButton = screen.getByText(/trigger/i);
    await userEvent.click(triggerButton);

    const submitButton = screen.getByText(/submit form/i);
    await userEvent.click(submitButton);

    expect(mockContextValue.updateDevice).toHaveBeenCalledWith(mockDevice.id, {
      system_name: "Test Device",
      type: "WINDOWS",
      hdd_capacity: "500",
    });
  });

  it("calls deleteDevice when delete is confirmed", async () => {
    renderDialog("delete", mockDevice);

    const triggerButton = screen.getByText(/trigger/i);
    await userEvent.click(triggerButton);

    const deleteButton = screen.getByText(/delete device/i);
    await userEvent.click(deleteButton);

    expect(mockContextValue.deleteDevice).toHaveBeenCalledWith(mockDevice.id);
  });
});
