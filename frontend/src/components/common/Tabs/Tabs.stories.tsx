import type { Meta, StoryObj } from '@storybook/react';

import Tabs from './Tabs';

type Story = StoryObj<typeof Tabs>;

/**
 * `Tabs` 컴포넌트는 여러 주제를 선택할 수 있고 주제에 대한 contents를 볼 수 있는 컴포넌트입니다.
 */
const meta: Meta<typeof Tabs> = {
  title: 'NAVIGATION/Tabs',
  component: Tabs,
};

export default meta;

/**
 * `DefaultTabs`은 기본적인 `Tabs` 스토리입니다.
 */
export const DefaultTabs: Story = {
  args: {
    children: (
      <>
        <Tabs.Item label="TAB1">CONTENTS1</Tabs.Item>
        <Tabs.Item label="TAB2">CONTENTS2</Tabs.Item>
        <Tabs.Item label="TAB3">CONTENTS3</Tabs.Item>
      </>
    ),
  },
};

/**
 * `PerfectFitTabs`은 한 줄에 8개의 Tab이 존재하는 `Tabs` 스토리입니다.
 */
export const PerfectFitTabs: Story = {
  args: {
    children: (
      <>
        {['1', '2', '3', '4', '5', '6', '7', '8'].map((item, index) => {
          return (
            <Tabs.Item key={index} label={`TAB${item}`}>
              CONTENTS{item}
            </Tabs.Item>
          );
        })}
      </>
    ),
  },
};

/**
 * `OverFitTabs`은 두 줄로 이어진 `Tabs` 스토리입니다.
 */
export const OverFitTabs: Story = {
  args: {
    children: (
      <>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map((item, index) => {
          return (
            <Tabs.Item key={index} label={`TAB${item}`}>
              CONTENTS{item}
            </Tabs.Item>
          );
        })}
      </>
    ),
  },
};

/**
 * `LongTextTabs`은 Tab의 길이가 긴 `Tabs` 스토리입니다.
 */
export const LongTextTabs: Story = {
  args: {
    children: (
      <>
        <Tabs.Item label="VERY LONG TAB TITLE">CONTENTS1</Tabs.Item>
        <Tabs.Item label="TAB2">CONTENTS2</Tabs.Item>
        <Tabs.Item label="TAB3">CONTENTS3</Tabs.Item>
      </>
    ),
  },
};
