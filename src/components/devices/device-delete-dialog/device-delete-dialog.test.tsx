import { fireEvent, render, screen, waitFor } from "../../../../tests/test-utils";
import userEvent from "@testing-library/user-event";
import { describe, it, beforeEach, vi, expect } from "vitest";
import { DeviceDeleteDialog } from "./device-delete-dialog";
import { Device } from "../../../types/device";
import { Dialog, DialogTrigger } from "@/components/ui/dialog/dialog";
import { Button } from "@/components/ui/button/button";

describe("DeviceDeleteDialog", () => {
  const mockOnDelete = vi.fn();
  const mockDevice: Device = {
    id: "1",
    system_name: "Test Device",
    type: "WINDOWS",
    hdd_capacity: "500",
  };

  const renderDialog = () => {
    return render(
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default" className="font-normal">
            Trigger
          </Button>
        </DialogTrigger>
        <DeviceDeleteDialog device={mockDevice} onDelete={mockOnDelete} isDeleting={false} error={null} />
      </Dialog>,
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the dialog with correct title and device name", async () => {
    renderDialog();

    const triggerButton = screen.getByText(/trigger/i);
    await userEvent.click(triggerButton);

    expect(screen.getByText(/delete device\?/i)).toBeInTheDocument();
    expect(screen.getByText(/test device/i)).toBeInTheDocument();
  });

  it("calls onDelete when delete button is clicked", async () => {
    mockOnDelete.mockResolvedValueOnce(undefined);
    renderDialog();

    const triggerButton = screen.getByText(/trigger/i);
    await userEvent.click(triggerButton);

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    await userEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  it("shows loading state while deleting", async () => {
    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default" className="font-normal">
            Trigger
          </Button>
        </DialogTrigger>
        <DeviceDeleteDialog device={mockDevice} onDelete={mockOnDelete} isDeleting={true} error={null} />
      </Dialog>,
    );

    const triggerButton = screen.getByText(/trigger/i);
    await userEvent.click(triggerButton);

    expect(screen.getByText(/deleting\.\.\./i)).toBeInTheDocument();
  });

  it("displays error message when error occurs", async () => {
    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default" className="font-normal">
            Trigger
          </Button>
        </DialogTrigger>
        <DeviceDeleteDialog device={mockDevice} onDelete={mockOnDelete} isDeleting={false} error="Failed to delete" />
      </Dialog>,
    );

    const triggerButton = screen.getByText(/trigger/i);
    await userEvent.click(triggerButton);

    expect(screen.getByText(/failed to delete/i)).toBeInTheDocument();
  });

  it("closes the dialog when cancel button is clicked", async () => {
    renderDialog();

    const triggerButton = screen.getByText(/trigger/i);
    await userEvent.click(triggerButton);

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    await userEvent.click(cancelButton);

    await waitFor(() => {
      expect(screen.queryByText(/delete device\?/i)).not.toBeInTheDocument();
    });
  });
});
