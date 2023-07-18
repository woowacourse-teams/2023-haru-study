import type { Meta, StoryObj } from '@storybook/react';

import Accordion from './Accordion';
import Typography from '../Typography/Typography';

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
      <Accordion.Item>
        <Accordion.Header>
          <Typography variant="h5">Title</Typography>
        </Accordion.Header>
        <Accordion.Panel>Panel</Accordion.Panel>
      </Accordion.Item>
    ),
  },
};

/**
 * `MultipleAccordion`는 여러개의 아코디언 컴포넌트를 가지는 `Accordion` 스토리입니다.
 */
export const MultipleAccordion: Story = {
  args: {
    children: [
      { title: 'Title1', panel: 'Panel1', id: 1 },
      { title: 'Title2', panel: 'Panel2', id: 2 },
      { title: 'Title3', panel: 'Panel3', id: 3 },
    ].map((item) => {
      return (
        <Accordion.Item key={item.id}>
          <Accordion.Header>
            <Typography variant="h5">{item.title}</Typography>
          </Accordion.Header>
          <Accordion.Panel>{item.panel}</Accordion.Panel>
        </Accordion.Item>
      );
    }),
  },
};
