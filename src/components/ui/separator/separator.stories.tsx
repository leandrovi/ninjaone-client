import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "./separator";

const meta = {
  title: "UI/Separator",
  component: Separator,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-[300px]">
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Radix UI</h4>
        <p className="text-sm text-muted-foreground">An open-source UI component library.</p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-5 items-center space-x-4 text-sm">
      <div>Item One</div>
      <Separator orientation="vertical" />
      <div>Item Two</div>
      <Separator orientation="vertical" />
      <div>Item Three</div>
    </div>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div className="w-[300px]">
      <div className="space-y-1">
        <h4 className="text-sm font-medium">Section One</h4>
        <p className="text-sm text-muted-foreground">Content for section one.</p>
      </div>
      <Separator className="my-4 bg-primary" />
      <div className="space-y-1">
        <h4 className="text-sm font-medium">Section Two</h4>
        <p className="text-sm text-muted-foreground">Content for section two.</p>
      </div>
    </div>
  ),
};

export const WithContentBetween: Story = {
  render: () => (
    <div className="w-[300px] space-y-4">
      <div>
        <h4 className="text-sm font-medium">Personal Information</h4>
        <p className="text-sm text-muted-foreground">Manage your personal details.</p>
      </div>
      <Separator />
      <div>
        <h4 className="text-sm font-medium">Business Information</h4>
        <p className="text-sm text-muted-foreground">Manage your business details.</p>
      </div>
      <Separator />
      <div>
        <h4 className="text-sm font-medium">Notification Settings</h4>
        <p className="text-sm text-muted-foreground">Manage your notification preferences.</p>
      </div>
    </div>
  ),
};

export const InList: Story = {
  render: () => (
    <div className="w-[300px]">
      <ul className="space-y-4">
        <li>
          <div className="text-sm">List Item 1</div>
          <Separator className="mt-4" />
        </li>
        <li>
          <div className="text-sm">List Item 2</div>
          <Separator className="mt-4" />
        </li>
        <li>
          <div className="text-sm">List Item 3</div>
          <Separator className="mt-4" />
        </li>
      </ul>
    </div>
  ),
};

export const WithCustomWidth: Story = {
  render: () => (
    <div className="w-[300px]">
      <div className="text-center">
        <h4 className="text-sm font-medium">Section Title</h4>
        <Separator className="my-4 mx-auto w-1/2" />
        <p className="text-sm text-muted-foreground">Section content goes here.</p>
      </div>
    </div>
  ),
};

export const Decorative: Story = {
  args: {
    decorative: true,
    className: "my-4",
  },
};

export const NonDecorative: Story = {
  args: {
    decorative: false,
    className: "my-4",
  },
};
