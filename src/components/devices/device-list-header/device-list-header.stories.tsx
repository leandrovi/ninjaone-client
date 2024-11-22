import type { Meta, StoryObj } from '@storybook/react';
import { DeviceListHeader } from './device-list-header';

const meta = {
  title: 'Components/Devices/DeviceListHeader',
  component: DeviceListHeader,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', background: '#ffffff', padding: '0 20px' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof DeviceListHeader>;

export default meta;
type Story = StoryObj<typeof DeviceListHeader>;

export const Default: Story = {};

export const CustomClassName: Story = {
  args: {},
}; 