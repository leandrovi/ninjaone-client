import { fireEvent, render, screen, waitFor } from "../../../../tests/test-utils";
import userEvent from "@testing-library/user-event";
import { describe, it, beforeEach, vi, expect } from "vitest";
import { DeviceForm } from "./device-form";
import { createMockPointerEvent } from "../../../../tests/__mocks__/mockPointerEvent";

beforeAll(() => {
  Element.prototype.hasPointerCapture = () => false;
});

describe("DeviceForm", () => {
  const mockOnSubmit = vi.fn();
  const mockOnCancel = vi.fn();

  const renderForm = () => {
    return render(<DeviceForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} isSubmitting={false} />);
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all form fields", () => {
    renderForm();

    expect(screen.getByLabelText(/system name/i)).toBeInTheDocument();
    expect(screen.getByText(/select type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/hdd capacity/i)).toBeInTheDocument();
  });

  it("shows validation errors for empty required fields", async () => {
    renderForm();

    const submitButton = screen.getByRole("button", { name: /submit/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/system name is required/i)).toBeInTheDocument();
    });
  });

  describe("DeviceForm", () => {
    it("inputs a value into the system name field and verifies it in the DOM", async () => {
      render(<DeviceForm onSubmit={vi.fn()} onCancel={vi.fn()} isSubmitting={false} />);

      const systemNameInput = screen.getByLabelText(/system name/i);
      await userEvent.type(systemNameInput, "Test Device");
      expect(systemNameInput).toHaveValue("Test Device");
    });
  });

  it("calls onSubmit with form data when valid", async () => {
    // This mock is needed because Radix UI Select uses Pointer Events
    window.PointerEvent = createMockPointerEvent as any;
    Object.assign(window.HTMLElement.prototype, {
      scrollIntoView: vi.fn(),
      releasePointerCapture: vi.fn(),
      hasPointerCapture: vi.fn(),
    });

    renderForm();

    const systemNameInput = screen.getByLabelText(/system name/i);
    fireEvent.input(systemNameInput, { target: { value: "Test Device" } });
    expect(systemNameInput).toHaveValue("Test Device");

    const selectTypeButton = screen.getByText(/select type/i).closest("button");

    if (selectTypeButton) {
      fireEvent.pointerDown(selectTypeButton);
    }

    const selectedOption = await screen.getByRole("option", { name: /windows/i });
    fireEvent.click(selectedOption);

    const hddCapacityInput = screen.getByLabelText(/hdd capacity/i);
    fireEvent.input(hddCapacityInput, { target: { value: "500" } });
    expect(hddCapacityInput).toHaveValue("500");

    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.submit(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        system_name: "Test Device",
        type: "WINDOWS",
        hdd_capacity: "500",
      });
    });
  });

  it("calls onCancel when cancel button is clicked", async () => {
    renderForm();

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    await userEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalled();
  });
});
