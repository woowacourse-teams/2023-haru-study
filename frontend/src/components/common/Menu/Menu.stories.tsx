import type { Meta, StoryObj } from '@storybook/react';
import { css } from 'styled-components';

import Menu from './Menu';

type Story = StoryObj<typeof Menu>;

/**
 * `Menu` 컴포넌트는 여러 목록을 보여주고 특정 이벤트를 위한 컴포넌트입니다.
 */
const meta: Meta<typeof Menu> = {
  title: 'NAVIGATION/Menu',
  component: Menu,
};

export default meta;

/**
 * `DefaultMenu`는 메뉴의 기본 `Menu` 스토리입니다.
 */
export const DefaultMenu: Story = {
  args: {
    children: (
      <>
        <Menu.Item onClick={() => alert('아이템1을 클릭했습니다.')}>아이템1</Menu.Item>
        <Menu.Item onClick={() => alert('아이템2을 클릭했습니다.')}>아이템2</Menu.Item>
        <Menu.Item onClick={() => alert('아이템3을 클릭했습니다.')}>아이템3</Menu.Item>
        <Menu.Item onClick={() => alert('아이템4을 클릭했습니다.')}>아이템4</Menu.Item>
      </>
    ),
  },
};

/**
 * `RightMenu`는 오른쪽 정렬된 `Menu` 스토리입니다.
 */
export const RightMenu: Story = {
  args: {
    children: (
      <>
        <Menu.Item onClick={() => alert('아이템1을 클릭했습니다.')}>아이템1</Menu.Item>
        <Menu.Item onClick={() => alert('아이템2을 클릭했습니다.')}>아이템2</Menu.Item>
        <Menu.Item onClick={() => alert('아이템3을 클릭했습니다.')}>아이템3</Menu.Item>
        <Menu.Item onClick={() => alert('아이템4을 클릭했습니다.')}>아이템4</Menu.Item>
      </>
    ),
    $menuListPosition: 'left',
    $style: css`
      margin: 0 0 0 auto;
    `,
  },
};
