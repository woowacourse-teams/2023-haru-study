import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
import { css } from 'styled-components';
import color from '../../styles/color';

type Story = StoryObj<typeof Button>;

/**
 * `Button` 컴포넌트는 특정 이벤트 실행, 라우팅을 위한 컴포넌트입니다.
 */
const meta: Meta<typeof Button> = {
  title: 'INPUTS/Button',
  component: Button,
};

export default meta;

/**
 * `DefaultButton`는 메인 색상을 가지는 `Button` 스토리입니다.
 */
export const DefaultButton: Story = {
  args: {
    children: 'button',
    variant: 'primary',
    size: 'medium',
  },
};

/**
 * `SecondaryButton`는 두번째 메인 색상을 가지는 `Button` 스토리입니다.
 */
export const SecondaryButton: Story = {
  args: {
    children: 'button',
    variant: 'secondary',
    size: 'medium',
  },
};

/**
 * `StudyingButton`는 학습중일 때 보여지는 `Button` 스토리입니다.
 */
export const StudyingButton: Story = {
  args: {
    children: 'button',
    variant: 'studying',
    size: 'medium',
  },
};

/**
 * `RetrospectButton`는 회고중일 때 보여지는 `Button` 스토립니다.
 */
export const RetrospectButton: Story = {
  args: {
    children: 'button',
    variant: 'retrospect',
    size: 'medium',
  },
};

/**
 * `XSmallButton`는 font-size가 16px인 `Button` 스토립니다.
 */
export const XSmallButton: Story = {
  args: {
    children: 'button',
    variant: 'primary',
    size: 'x-small',
    $block: false,
  },
};

/**
 * `SmallButton`는 font-size가 20px인 `Button` 스토립니다.
 */
export const SmallButton: Story = {
  args: {
    children: 'button',
    variant: 'primary',
    size: 'small',
    $block: false,
  },
};

/**
 * `LargeButton`는 font-size가 28px인 `Button` 스토립니다.
 */
export const LargeButton: Story = {
  args: {
    children: 'button',
    variant: 'primary',
    size: 'large',
    $block: false,
  },
};

/**
 * `XLargeButton`는 font-size가 32px인 `Button` 스토립니다.
 */
export const XLargeButton: Story = {
  args: {
    children: 'button',
    variant: 'primary',
    size: 'x-large',
    $block: false,
  },
};

/**
 * `NoneBlockButton`는 가로폭이 부모의 가로 폭에 영향을 받지 않는 `Button` 스토리입니다.
 */
export const NoneBlockButton: Story = {
  args: {
    children: 'button',
    variant: 'primary',
    size: 'medium',
    $block: false,
  },
};

/**
 * `OutlineButton`는 테두리로 표현된 `Button` 스토리입니다.
 */
export const OutlineButton: Story = {
  args: {
    children: 'button',
    variant: 'primary',
    size: 'medium',
    concept: 'outlined',
  },
};

/**
 * `TextButton`는 텍스트 표현된 `Button` 스토리입니다.
 */
export const TextButton: Story = {
  args: {
    children: 'button',
    variant: 'primary',
    size: 'medium',
    concept: 'text',
  },
};

/**
 * `DisableButton`는 버튼의 기능이 비활성화 된 `Button` 스토리입니다.
 */
export const DisableButton: Story = {
  args: {
    children: 'button',
    variant: 'primary',
    size: 'medium',
    disabled: true,
  },
};

/**
 * `CustomButton`는 버튼을 커스튬을 한 `Button` 스토리입니다.
 */
export const CustomButton: Story = {
  args: {
    children: 'button',
    variant: 'primary',
    size: 'medium',
    css: css`
      background-color: ${color.blue[100]};
      color: ${color.blue[500]};
      border: 1px solid ${color.blue[500]};
    `,
  },
};

/**
 * `CustomButton`는 로딩중일 때를 나타내는 `Button` 스토리입니다.
 */
export const LoadingButton: Story = {
  args: {
    children: 'button',
    variant: 'primary',
    size: 'medium',
    isLoading: true,
  },
};
