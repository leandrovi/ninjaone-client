import type { Meta, StoryObj } from '@storybook/react';
import { DeviceListItem } from './device-list-item';
import { Table } from '../../ui/table';

const meta: Meta<typeof DeviceListItem> = {
  title: 'Components/Devices/DeviceListItem',
  component: DeviceListItem,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', background: '#ffffff', padding: '0 20px' }}>
        <Table>
          <Story />
        </Table>
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    onEdit: { action: 'edit clicked' },
    onDelete: { action: 'delete clicked' }
  }
};

export default meta;
type Story = StoryObj<typeof DeviceListItem>;

export const Windows: Story = {
  args: {
    device: {
      id: '1',
      type: 'WINDOWS',
      system_name: 'Windows Workstation',
      hdd_capacity: '256'
    },
    onEdit: () => {},
    onDelete: () => {}
  }
};

export const Mac: Story = {
  args: {
    device: {
      id: '2',
      type: 'MAC',
      system_name: 'MacBook Pro',
      hdd_capacity: '512'
    },
    onEdit: () => {},
    onDelete: () => {}
  }
};

export const Linux: Story = {
  args: {
    device: {
      id: '3',
      type: 'LINUX',
      system_name: 'Ubuntu Server',
      hdd_capacity: '1024'
    },
    onEdit: () => {},
    onDelete: () => {}
  }
}; 