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
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel value="1">PANEL ONE</Tabs.Panel>
          <Tabs.Panel value="2">PANEL TWO</Tabs.Panel>
        </Tabs.Panels>
      </>
    ),
  },
};
