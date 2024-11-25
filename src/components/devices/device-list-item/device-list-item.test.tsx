import { fireEvent, render, screen } from "../../../../tests/test-utils";
import { describe, it, beforeEach, vi } from "vitest";
import { DeviceListItem } from "./device-list-item";
import type { Device } from "@/types/device";
import { createMockPointerEvent } from "../../../../tests/__mocks__/mockPointerEvent";

vi.mock("@/assets/icons/windows.svg", () => ({
  default: "windows-icon.svg",
}));

vi.mock("@/assets/icons/mac.svg", () => ({
  default: "mac-icon.svg",
}));

vi.mock("@/assets/icons/linux.svg", () => ({
  default: "linux-icon.svg",
}));

describe("DeviceListItem", () => {
  const mockDevice: Device = {
    id: "1",
    system_name: "Windows PC",
    type: "WINDOWS",
    hdd_capacity: "500",
  };

  const renderDeviceListItem = (device: Device = mockDevice) => {
    return render(
      <table>
        <tbody>
          <DeviceListItem device={device} />
        </tbody>
      </table>,
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("displays device information", () => {
    renderDeviceListItem();

    expect(screen.getByText("Windows PC")).toBeInTheDocument();
    expect(screen.getByText(/500/)).toBeInTheDocument();
    expect(screen.getByText(/GB/)).toBeInTheDocument();
  });

  it("shows device actions when clicking the menu button", async () => {
    // This mock is needed because Radix UI Select uses Pointer Events
    window.PointerEvent = createMockPointerEvent as any;
    Object.assign(window.HTMLElement.prototype, {
      scrollIntoView: vi.fn(),
      releasePointerCapture: vi.fn(),
      hasPointerCapture: vi.fn(),
    });

    renderDeviceListItem();

    const menuButton = screen.getByRole("button");
    fireEvent.pointerDown(menuButton);

    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it.each([
    ["WINDOWS", "Windows PC"],
    ["MAC", "Mac Book"],
    ["LINUX", "Linux Server"],
  ])("displays %s device correctly", (type, name) => {
    const device = {
      ...mockDevice,
      type: type as Device["type"],
      system_name: name,
    };

    renderDeviceListItem(device);

    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText(type.toLowerCase())).toBeInTheDocument();
  });

  it("shows device capacity", () => {
    renderDeviceListItem();

    expect(screen.getByText(/500/)).toBeInTheDocument();
    expect(screen.getByText(/GB/)).toBeInTheDocument();
  });
});
