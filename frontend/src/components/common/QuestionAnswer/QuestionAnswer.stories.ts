import type { Meta, StoryObj } from '@storybook/react';

import color from '@Styles/color';

import QuestionAnswer from './QuestionAnswer';

type Story = StoryObj<typeof QuestionAnswer>;

const meta: Meta<typeof QuestionAnswer> = {
  title: 'DATA DISPLAY/QuestionAnswer',
  component: QuestionAnswer,
};

export default meta;

export const Default: Story = {
  args: {
    question: '질문입니다.',
    answer: '답변입니다.',
  },
};

export const Studying: Story = {
  args: {
    question: '학습 목표',
    answer: '자바스크립트의 this와 다른 언어의 this와의 차이점',
    iconColor: color.red[600],
  },
};

export const Retrospect: Story = {
  args: {
    question: '지난 30분간의 학습은 어땠나요?',
    answer: '생각보다 어려웠다.',
    iconColor: color.teal[600],
  },
};
