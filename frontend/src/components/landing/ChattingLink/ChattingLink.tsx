import { useState } from 'react';
import { css, styled } from 'styled-components';

import color from '@Styles/color';

import ChatIcon from '@Assets/icons/ChatIcon';

const OPEN_CHATTING_LINK = 'https://open.kakao.com/o/gDt2u0Hf';

const ChattingLink = () => {
  const [isHoverIcon, setIsHoverIcon] = useState(false);

  return (
    <Layout>
      <GuideMessage $isHoverIcon={isHoverIcon}>다른 사람과 함께 학습하고 싶다면?</GuideMessage>
      <Link
        href={OPEN_CHATTING_LINK}
        target="_blank"
        onMouseEnter={() => setIsHoverIcon(true)}
        onMouseLeave={() => setIsHoverIcon(false)}
      >
        <ChatIcon color="rgba(34,34,34)" />
      </Link>
    </Layout>
  );
};

export default ChattingLink;

const Layout = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

type GuideMessageProps = {
  $isHoverIcon: boolean;
};

const GuideMessage = styled.p<GuideMessageProps>`
  font-size: 1.4rem;

  color: ${color.neutral[600]};

  ${({ $isHoverIcon }) => css`
    opacity: ${$isHoverIcon ? '1' : '0'};
  `}

  transition: opacity 0.15s ease;
`;

const Link = styled.a`
  cursor: pointer;

  background-color: ${color.brand.kakao};

  padding: 12px;
  border-radius: 14px;

  svg {
    width: 24px;
    height: 24px;
  }
`;
