import type { Meta, StoryObj } from '@storybook/react';
import { styled } from 'styled-components';

import Timer from './Timer';
import color from '../../styles/color';

type Story = StoryObj<typeof TimerWithBackground>;

type Props = {
  minutes: number;
  color: string;
};

const TimerWithBackground = ({ minutes, color }: Props) => {
  return (
    <Background color={color}>
      <Timer minutes={minutes} buttonColor={color} />
    </Background>
  );
};

const Background = styled.div<{ color: string }>`
  display: flex;
  justify-content: center;

  padding: 50px;

  background-color: ${({ color }) => color};
`;

const meta: Meta<typeof TimerWithBackground> = {
  title: 'STUDY ROOM/Timer',
  component: TimerWithBackground,
};

export default meta;

export const Planning: Story = {
  args: {
    minutes: 10,
    color: color.blue[500],
  },
};

export const Studying: Story = {
  args: {
    minutes: 30,
    color: color.red[600],
  },
};

export const Retrospect: Story = {
  args: {
    minutes: 10,
    color: color.teal[600],
  },
};
