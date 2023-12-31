import type { Meta, StoryObj } from '@storybook/react';
import { css } from 'styled-components';

import color from '@Styles/color';

import CircularProgress from './CircularProgress';

type Story = StoryObj<typeof CircularProgress>;

/**
 * `CircularProgress` 컴포넌트는 특정 이벤트 실행, 라우팅을 위한 컴포넌트입니다.
 */
const meta: Meta<typeof CircularProgress> = {
  title: 'FEEDBACK/CircularProgress',
  component: CircularProgress,
};

export default meta;

/**
 * `DefaultCircularProgress`는 로딩을 나타내는 기본 `CircularProgress` 스토리입니다.
 */
export const DefaultCircularProgress: Story = {
  args: {
    $style: css`
      border: 2px solid ${color.black};
      border-color: ${color.black} transparent transparent transparent;
    `,
  },
};

/**
 * `XSmallCircularProgress`는 가로, 세로가 16px인 `CircularProgress` 스토리입니다.
 */
export const XSmallCircularProgress: Story = {
  args: {
    size: 'x-small',
    $style: css`
      border: 2px solid ${color.black};
      border-color: ${color.black} transparent transparent transparent;
    `,
  },
};

/**
 * `SmallCircularProgress`는 가로, 세로가 20px인 `CircularProgress` 스토리입니다.
 */
export const SmallCircularProgress: Story = {
  args: {
    size: 'small',
    $style: css`
      border: 2px solid ${color.black};
      border-color: ${color.black} transparent transparent transparent;
    `,
  },
};

/**
 * `LargeCircularProgress`는 가로, 세로가 28px인 `CircularProgress` 스토리입니다.
 */
export const LargeCircularProgress: Story = {
  args: {
    size: 'large',
    $style: css`
      border: 2px solid ${color.black};
      border-color: ${color.black} transparent transparent transparent;
    `,
  },
};

/**
 * `LargeCircularProgress`는 가로, 세로가 32px인 `CircularProgress` 스토리입니다.
 */
export const XLargeCircularProgress: Story = {
  args: {
    size: 'x-large',
    $style: css`
      border: 2px solid ${color.black};
      border-color: ${color.black} transparent transparent transparent;
    `,
  },
};

/**
 * `CustomCircularProgress`는 width와 height를 커스튬한 `CircularProgress` 스토리입니다.
 */
export const CustomCircularProgress: Story = {
  args: {
    size: 'x-large',
    $style: css`
      border: 2px solid ${color.black};
      border-color: ${color.black} transparent transparent transparent;
      width: 5rem;
      height: 5rem;
    `,
  },
};
