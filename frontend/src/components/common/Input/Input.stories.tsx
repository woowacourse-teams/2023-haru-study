import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';

type Story = StoryObj<typeof Input>;

/**
 * `Input` 컴포넌트는 `TextField`가 있고, 기호에 따라 `label`과 `bottomText`가 있는 입력 폼 컴포넌트입니다.
 */
const meta: Meta<typeof Input> = {
  title: 'INPUTS/TextField',
  component: Input,
};

export default meta;

/**
 * `DefaultInput`은 기본적인 `Input` 스토리입니다.
 */
export const DefaultInput: Story = {
  args: {
    children: <Input.TextField />,
  },
};

/**
 * `DisabledInput`은 `Input`컴포넌트가 `disabled`일 때의 `Input` 스토리입니다.
 */
export const DisabledInput: Story = {
  args: {
    children: <Input.TextField value={1234} disabled />,
  },
};

/**
 * `InputWithLabel`은 `label`이 있는 `Input` 스토리 입니다.
 */
export const InputWithLabel: Story = {
  args: {
    label: 'Label',
    children: <Input.TextField />,
  },
};

/**
 * `InputWithLabelAndBottomText`은 `label`과 `bottomText`가 있는 `Input` 스토리 입니다.
 */
export const InputWithLabelAndBottomText: Story = {
  args: {
    label: 'Label',
    bottomText: 'BottomText',
    children: <Input.TextField />,
  },
};

/**
 * `InputValidationIsError`는 `Input` 입력 값이 오류일 때의  `Input` 스토리 입니다.
 */
export const InputValidationIsError: Story = {
  args: {
    label: 'Label',
    bottomText: 'BottomText',
    children: <Input.TextField error={true} />,
  },
};
