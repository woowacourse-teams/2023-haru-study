import { useState } from 'react';
import { css, styled } from 'styled-components';

import color from '@Styles/color';

import ChatIcon from '@Assets/icons/ChatIcon';

const OPEN_CHATTING_LINK = 'https://open.kakao.com/o/gDt2u0Hf';

const ChattingLink = () => {
  const [isHoverIcon, setIsHoverIcon] = useState(false);

  return (
    <Layout>
      <GuideMessage $isHoverIcon={isHoverIcon}>하루스터디로 함께 공부를 사람을 찾는다면?</GuideMessage>
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
  position: fixed;
  bottom: 36px;
  right: 36px;

  display: flex;
  align-items: flex-end;
  gap: 10px;
`;

type GuideMessageProps = {
  $isHoverIcon: boolean;
};

const GuideMessage = styled.p<GuideMessageProps>`
  font-size: 1.4rem;

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

  @media screen and (max-width: 768px) {
    bottom: 18px;
    right: 18px;
  }
`;
