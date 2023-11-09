import type { Meta, StoryObj } from '@storybook/react';

import DatePicker from './DatePIcker';

type Story = StoryObj<typeof DatePicker>;

/**
 * `DatePicker`는 일정과 같이 day에 대한 정보를 제공하는 달력 컴포넌트입니다.
 */
const meta: Meta<typeof DatePicker> = {
  title: 'COMPONENTS/DatePicker',
  component: DatePicker,
};

export default meta;

/**
 * `DefaultDatePicker`는 현재 년, 월을 렌더링한 기본적인 DatePicker의 스토리입니다.
 */
export const DefaultDatePicker: Story = {};
