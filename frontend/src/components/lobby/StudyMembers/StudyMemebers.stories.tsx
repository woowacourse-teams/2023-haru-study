import type { Meta, StoryObj } from '@storybook/react';

import StudyMembers from './StudyMembers';

type Story = StoryObj<typeof StudyMembers>;

/**
 * `StudyMembers` 컴포넌트는 어떤 스터디원이 들어왔는지 보여주는 컴포넌트입니다.
 */
const meta: Meta<typeof StudyMembers> = {
  title: 'WAITING/StudyMembers',
  component: StudyMembers,
};

export default meta;

/**
 * `OneRow`는 멤버가 6명일때 한줄이되는 `StudyMembers` 스토리입니다.
 */
export const OneRow: Story = {
  args: {
    studyMembers: ['노아', '룩소', '엽토', '테오', '마코', '히이로'],
  },
};

/**
 * `TwoRow`는 멤버가 12명일때 두줄이되는 `StudyMembers` 스토리입니다.
 */
export const TwoRow: Story = {
  args: {
    studyMembers: ['노아', '룩소', '엽토', '테오', '마코', '히이로', '모디', '왼손', '솔라', '준', '구구', '공원'],
  },
};
