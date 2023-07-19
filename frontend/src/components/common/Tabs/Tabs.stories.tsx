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
        <Tabs.List>
          <Tabs.Item>ITEM ONE</Tabs.Item>
          <Tabs.Item>ITEM TWO</Tabs.Item>
          <Tabs.Item>ITEM THREE</Tabs.Item>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel>PANEL ONE</Tabs.Panel>
          <Tabs.Panel>PANEL TWO</Tabs.Panel>
          <Tabs.Panel>PANEL THREE</Tabs.Panel>
        </Tabs.Panels>
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
        <Tabs.List>
          {['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT'].map((item, index) => {
            return <Tabs.Item key={index}>ITEM {item}</Tabs.Item>;
          })}
        </Tabs.List>
        <Tabs.Panels>
          {['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT'].map((item, index) => {
            return <Tabs.Panel key={index}>PANEL {item}</Tabs.Panel>;
          })}
        </Tabs.Panels>
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
        <Tabs.List>
          {['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN'].map((item, index) => {
            return <Tabs.Item key={index}>ITEM {item}</Tabs.Item>;
          })}
        </Tabs.List>
        <Tabs.Panels>
          {['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN'].map((item, index) => {
            return <Tabs.Panel key={index}>PANEL {item}</Tabs.Panel>;
          })}
        </Tabs.Panels>
      </>
    ),
  },
};

/**
 * `LongTabs`은 Tab의 길이가 긴 `Tabs` 스토리입니다.
 */
export const LongTabs: Story = {
  args: {
    children: (
      <>
        <Tabs.List>
          <Tabs.Item>VERY LONG TAB ITEM</Tabs.Item>
          <Tabs.Item>ITEM TWO</Tabs.Item>
          <Tabs.Item>ITEM THREE</Tabs.Item>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel>PANEL ONE</Tabs.Panel>
          <Tabs.Panel>PANEL TWO</Tabs.Panel>
          <Tabs.Panel>PANEL THREE</Tabs.Panel>
        </Tabs.Panels>
      </>
    ),
  },
};
