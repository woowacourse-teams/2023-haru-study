import type { Meta, StoryObj } from '@storybook/react';

import Select from './Select';

type Story = StoryObj<typeof Select>;

/**
 * `Select` 컴포넌트는 `SelectTrigger`, `SelectList`, `SelectItem`으로 이루어져 있는 컴포넌트입니다.
 */
const meta: Meta<typeof Select> = {
  title: 'INPUTS/Select',
  component: Select,
};

export default meta;

/**
 * `DefaultSelect`는 기본적인 `Select` 스토리입니다.
 */
export const DefaultSelect: Story = {
  args: {
    children: (
      <>
        <Select.Trigger></Select.Trigger>
        <Select.List
          onChange={() => {
            alert('목록이 펼쳐집니다.');
          }}
        >
          <Select.Item value="Item1" suffix="" />
          <Select.Item value="Item2" suffix="" />
          <Select.Item value="Item3" suffix="" />
        </Select.List>
      </>
    ),
  },
};
