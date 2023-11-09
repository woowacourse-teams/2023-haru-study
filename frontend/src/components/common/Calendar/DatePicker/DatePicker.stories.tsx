/* eslint-disable @typescript-eslint/restrict-template-expressions */
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

/**
 * `StartEndDatePicker`는 startDate와 endDate가 정해진 DatePicker의 스토리입니다.
 */
export const StartEndDatePicker: Story = {
  args: {
    startDate: new Date('2023-11-02'),
    endDate: new Date('2023-11-09'),
  },
};

/**
 * `OnChangeDatePicker`는 startDate와 endDate를 onChangeDate 속성을 통해 받아올 수 있는 DatePicker의 스토리입니다.
 */
export const OnChangeDatePicker: Story = {
  args: {
    onChangeDate: (startDate, endDate) => {
      window.alert(`${startDate || ''}, ${endDate || ''}`);
    },
  },
};
