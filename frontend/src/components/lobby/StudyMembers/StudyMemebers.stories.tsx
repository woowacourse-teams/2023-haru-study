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
export const SixMembers: Story = {
  args: {
    studyMembers: [
      { participantId: '0', nickname: '노아', isHost: true },
      { participantId: '1', nickname: '룩소', isHost: true },
      { participantId: '2', nickname: '마코', isHost: true },
      { participantId: '3', nickname: '히이로', isHost: true },
      { participantId: '4', nickname: '테오', isHost: true },
      { participantId: '5', nickname: '모디', isHost: true },
    ],
  },
};

/**
 * `TwoRow`는 멤버가 12명일때 두줄이되는 `StudyMembers` 스토리입니다.
 */
export const TwelveMembers: Story = {
  args: {
    studyMembers: [
      { participantId: '0', nickname: '노아', isHost: true },
      { participantId: '1', nickname: '룩소', isHost: true },
      { participantId: '2', nickname: '마코', isHost: true },
      { participantId: '3', nickname: '히이로', isHost: true },
      { participantId: '4', nickname: '테오', isHost: true },
      { participantId: '5', nickname: '모디', isHost: true },
      { participantId: '6', nickname: '노아2', isHost: true },
      { participantId: '7', nickname: '룩소2', isHost: true },
      { participantId: '8', nickname: '마코2', isHost: true },
      { participantId: '9', nickname: '히이로2', isHost: true },
      { participantId: '10', nickname: '테오2', isHost: true },
      { participantId: '11', nickname: '모디2', isHost: true },
    ],
  },
};
