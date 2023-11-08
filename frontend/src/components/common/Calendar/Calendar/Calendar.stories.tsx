import type { Meta, StoryObj } from '@storybook/react';
import { STUDY_LIST_9_ARRAY } from 'mocks/mockData';

import Calendar from './Calendar';

type Story = StoryObj<typeof Calendar>;

/**
 * `Calendar`는 일정과 같이 day에 대한 정보를 제공하는 달력 컴포넌트입니다.
 */
const meta: Meta<typeof Calendar> = {
  title: 'COMPONENTS/Calendar',
  component: Calendar,
};

export default meta;

/**
 * `DefaultCalendar`는 현재 년, 월을 렌더링한 기본적인 Calendar의 스토리입니다.
 */
export const DefaultCalendar: Story = {};

/**
 * `Calendar202309`는 2023년 9월 달력으로 외부에서 데이터를 받는 스토리입니다.
 */
export const Calendar202309: Story = {
  args: {
    year: 2023,
    month: 9,
    children: STUDY_LIST_9_ARRAY.map((item, index) => {
      return (
        <Calendar.Item key={index} date={item.createdDate}>
          {item.name}
        </Calendar.Item>
      );
    }),
  },
};
