import type { Meta, StoryObj } from '@storybook/react';

import QuestionTextarea from './QuestionTextarea';

type Story = StoryObj<typeof QuestionTextarea>;

const meta: Meta<typeof QuestionTextarea> = {
  title: 'INPUTS/QuestionTextarea',
  component: QuestionTextarea,
};

export default meta;

export const Default: Story = {
  args: {
    question: 'Question1',
  },
};

export const WithErrorMessage: Story = {
  args: {
    question: 'Question1',
    errorMessage: 'error message',
  },
};
