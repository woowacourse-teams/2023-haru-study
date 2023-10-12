import type { Meta, StoryObj } from '@storybook/react';
import { styled } from 'styled-components';

import color from '@Styles/color';

import type { Step } from '@Types/study';

import Timer from './Timer';

type Story = StoryObj<typeof TimerWithBackground>;

type Props = {
  minutes: number;
  backgroundColor: string;
  step: Step;
};

const TimerWithBackground = ({ minutes, backgroundColor, step }: Props) => {
  return (
    <Background backgroundColor={backgroundColor}>
      <Timer studyMinutes={minutes} step={step} currentCycle={1} />
    </Background>
  );
};

const Background = styled.div<{ backgroundColor: string }>`
  display: flex;
  justify-content: center;

  padding: 50px;

  background-color: ${({ backgroundColor }) => backgroundColor};
`;

const meta: Meta<typeof TimerWithBackground> = {
  title: 'STUDY BOARD/Timer',
  component: TimerWithBackground,
};

export default meta;

export const Planning: Story = {
  args: {
    minutes: 10,
    backgroundColor: color.blue[500],
    step: 'planning',
  },
};

export const Studying: Story = {
  args: {
    minutes: 30,
    backgroundColor: color.red[600],
    step: 'studying',
  },
};

export const Retrospect: Story = {
  args: {
    minutes: 10,
    backgroundColor: color.teal[600],
    step: 'retrospect',
  },
};
