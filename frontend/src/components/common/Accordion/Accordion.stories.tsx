import type { Meta, StoryObj } from '@storybook/react';

import Accordion from './Accordion';

type Story = StoryObj<typeof Accordion>;

/**
 * `Accordion` 컴포넌트는 contents가 아래로 열리는 컴포넌트입니다.
 */
const meta: Meta<typeof Accordion> = {
  title: 'SURFACES/Accordion',
  component: Accordion,
};

export default meta;

/**
 * `DefaultAccordion`는 아코디언 컴포넌트의 기본 `Accordion` 스토리입니다.
 */
export const DefaultAccordion: Story = {
  args: {
    children: (
      <>
        <Accordion.Item>
          <Accordion.Header>Header</Accordion.Header>
          <Accordion.Panel>Panel</Accordion.Panel>
        </Accordion.Item>
      </>
    ),
  },
};
