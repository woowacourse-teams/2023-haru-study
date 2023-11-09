import type { Meta, StoryObj } from '@storybook/react';

import DatePicker from './DatePicker';

type Story = StoryObj<typeof DatePicker>;

/**
 * `DatePicker`는 날짜를 선택할 수 있는 달력 컴포넌트입니다.
 */
const meta: Meta<typeof DatePicker> = {
  title: 'COMPONENTS/DatePicker',
  component: DatePicker,
};

export default meta;

/**
 * `DefaultDatePicker`는 기본적인 DatePicker의 스토리입니다.
 */
export const DefaultDatePicker: Story = {};
