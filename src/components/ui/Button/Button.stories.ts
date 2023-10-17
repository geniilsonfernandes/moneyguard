import type { Meta, StoryObj } from '@storybook/react';
import Button from '.';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
    theme: 'slate',
    variant: 'fill'
  }
};

export const Variant: Story = {
  args: {
    ...Default.args,
    variant: 'outline'
  }
};
