import { styled, css, keyframes } from 'styled-components';

import color from '@Styles/color';

import ResetIcon from '@Assets/icons/ResetIcon';

type Props = {
  isRefetch: boolean;
  refetchProgressRecordList: () => void;
};

const ResetButton = ({ refetchProgressRecordList, isRefetch }: Props) => {
  const handleClickResetButton = () => refetchProgressRecordList();

  return (
    <Layout onClick={handleClickResetButton} role="presentation" $rotateAnimation={isRefetch}>
      <ResetIcon color={color.neutral[500]} />
    </Layout>
  );
};

export default ResetButton;

const Rotation = keyframes`
  0% {
    transform:rotate(0deg);
  }
  100%{
    transform:rotate(-360deg);
  }
`;

type LayoutProps = {
  $rotateAnimation: boolean;
};

const Layout = styled.div<LayoutProps>`
  position: absolute;
  top: 0;
  right: 0;
  padding: 20px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  svg {
    width: 30px;
    height: 30px;

    transition: transform 1s ease;
  }

  ${({ $rotateAnimation }) => css`
    ${$rotateAnimation &&
    css`
      animation: ${Rotation} 1s ease forwards;
      cursor: default;
    `}
  `}

  @media screen and (max-width: 768px) {
    top: -40px;
    padding: 0px;
  }
`;
