import Calendar from '@Utils/Calendar/Calendar';
import type { Meta, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof Calendar>;

/**
 * `Calendar` 컴포넌트는 특정 이벤트 실행, 라우팅을 위한 컴포넌트입니다.
 */
const meta: Meta<typeof Calendar> = {
  title: 'INPUTS/Calendar',
  component: Calendar,
};

export default meta;

/**
 * `DefaultCalendar`는 메인 색상을 가지는 `Calendar` 스토리입니다.
 */
export const DefaultCalendar: Story = {
  args: {},
};
