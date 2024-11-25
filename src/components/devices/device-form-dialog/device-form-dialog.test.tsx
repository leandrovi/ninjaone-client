import { fireEvent, render, screen, waitFor } from "../../../../tests/test-utils";
import userEvent from "@testing-library/user-event";
import { describe, it, beforeEach, vi, expect } from "vitest";
import { DeviceFormDialog } from "./device-form-dialog";
import { Device } from "../../../types/device";
import { Dialog, DialogTrigger } from "@/components/ui/dialog/dialog";
import { Button } from "@/components/ui/button/button";
import { createMockPointerEvent } from "../../../../tests/__mocks__/mockPointerEvent";

describe("DeviceFormDialog", async () => {
  const mockOnSubmit = vi.fn();
  const mockDevice: Device = {
    id: "1",
    system_name: "Test Device",
    type: "WINDOWS",
    hdd_capacity: "500",
  };

  const renderDialog = (mode: "edit" | "create", device?: Device) => {
    return render(
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default" className="font-normal">
            Trigger
          </Button>
        </DialogTrigger>
        <DeviceFormDialog mode={mode} device={device} onSubmit={mockOnSubmit} isSubmitting={false} error={null} />,
      </Dialog>,
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the dialog with the correct title for create mode", async () => {
    renderDialog("create");

    const triggerButton = screen.getByText(/trigger/i);
    await userEvent.click(triggerButton);
    expect(screen.getByText(/add device/i)).toBeInTheDocument();
  });

  it("renders the dialog with the correct title for edit mode", async () => {
    renderDialog("edit", mockDevice);

    const triggerButton = screen.getByText(/trigger/i);
    await userEvent.click(triggerButton);
    expect(screen.getByText(/edit device/i)).toBeInTheDocument();
  });

  it("calls onSubmit with form data when valid", async () => {
    // This mock is needed because Radix UI Select uses Pointer Events
    window.PointerEvent = createMockPointerEvent as any;
    Object.assign(window.HTMLElement.prototype, {
      scrollIntoView: vi.fn(),
      releasePointerCapture: vi.fn(),
      hasPointerCapture: vi.fn(),
    });

    renderDialog("create");

    const triggerButton = screen.getByText(/trigger/i);
    await userEvent.click(triggerButton);

    const systemNameInput = screen.getByLabelText(/system name/i);
    fireEvent.input(systemNameInput, { target: { value: "New Device" } });
    expect(systemNameInput).toHaveValue("New Device");

    const selectTypeButton = screen.getByText(/select type/i).closest("button");

    if (selectTypeButton) {
      fireEvent.pointerDown(selectTypeButton);
    }

    const selectedOption = screen.getByRole("option", { name: /windows/i });
    fireEvent.click(selectedOption);

    const hddCapacityInput = screen.getByLabelText(/hdd capacity/i);
    fireEvent.input(hddCapacityInput, { target: { value: "1000" } });
    expect(hddCapacityInput).toHaveValue("1000");

    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.submit(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        system_name: "New Device",
        type: "WINDOWS",
        hdd_capacity: "1000",
      });
    });
  });

  it("closes the dialog when cancel button is clicked", async () => {
    renderDialog("edit", mockDevice);

    const triggerButton = screen.getByText(/trigger/i);
    await userEvent.click(triggerButton);

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    await userEvent.click(cancelButton);

    await waitFor(() => {
      expect(screen.queryByText(/edit device/i)).not.toBeInTheDocument();
    });
  });

  it("displays error message when error prop is set", async () => {
    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default" className="font-normal">
            Trigger
          </Button>
        </DialogTrigger>
        <DeviceFormDialog mode="create" onSubmit={mockOnSubmit} isSubmitting={false} error="An error occurred" />
      </Dialog>,
    );

    const triggerButton = screen.getByText(/trigger/i);
    await userEvent.click(triggerButton);
    expect(screen.getByText(/an error occurred/i)).toBeInTheDocument();
  });
});
