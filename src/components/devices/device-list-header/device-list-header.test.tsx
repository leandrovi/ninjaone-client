import { render, screen } from "../../../../tests/test-utils";
import userEvent from "@testing-library/user-event";
import { DeviceListHeader } from "./device-list-header";
import { vi } from "vitest";

vi.mock("@/assets/icons/plus.svg", () => ({ default: "plus-icon.svg" }));

describe("DeviceListHeader", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders header with title and add button", () => {
    render(<DeviceListHeader />);

    expect(screen.getByText("Devices")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add device/i })).toBeInTheDocument();
  });

  it("opens device dialog when add button is clicked", async () => {
    render(<DeviceListHeader />);

    const addButton = screen.getByRole("button", { name: /add device/i });
    await userEvent.click(addButton);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
