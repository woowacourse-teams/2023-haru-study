import { useState } from 'react';
import { css, styled } from 'styled-components';

import Footer from '@Components/common/Footer/Footer';
import Header from '@Components/common/Header/Header';
import GuideSection from '@Components/landing/GuideSection/GuideSection';
import LandingMainSection from '@Components/landing/LandingMainSection/LandingMainSection';
import MemberProfile from '@Components/landing/MemberProfile/MemberProfile';

import color from '@Styles/color';

import ChatIcon from '@Assets/icons/ChatIcon';

const Landing = () => {
  const [isHoverIcon, setIsHoverIcon] = useState(false);

  return (
    <>
      <LandingHeader>
        <Header />
        <MemberProfile />
      </LandingHeader>
      <LandingContents>
        <LandingMainSection />
        <GuideSection />
      </LandingContents>
      <Footer />
      <KakaoOpenChatLinkContainer>
        <GuideMessage $isHoverIcon={isHoverIcon}>하루스터디로 함께 공부를 사람을 찾는다면?</GuideMessage>
        <KakaoOpenChatLink
          href="https://open.kakao.com/o/gDt2u0Hf"
          target="_blank"
          onMouseEnter={() => setIsHoverIcon(true)}
          onMouseLeave={() => setIsHoverIcon(false)}
        >
          <ChatIcon color="rgba(34,34,34)" />
        </KakaoOpenChatLink>
      </KakaoOpenChatLinkContainer>
    </>
  );
};

export default Landing;

const LandingHeader = styled.div`
  display: flex;
  align-items: center;

  padding-right: 40px;
`;

const LandingContents = styled.div`
  width: 90%;

  margin: 0 auto;
`;

const KakaoOpenChatLinkContainer = styled.div`
  position: fixed;
  bottom: 36px;
  right: 36px;

  display: flex;
  align-items: flex-end;
  gap: 10px;
`;

const GuideMessage = styled.p<{ $isHoverIcon: boolean }>`
  font-size: 1.4rem;

  ${({ $isHoverIcon }) => css`
    opacity: ${$isHoverIcon ? '1' : '0'};
  `}

  transition: opacity 0.1s ease;
`;

const KakaoOpenChatLink = styled.a`
  cursor: pointer;

  background-color: ${color.brand.kakao};

  padding: 12px;
  border-radius: 14px;

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover + p {
    opacity: 1;
  }

  @media screen and (max-width: 768px) {
    bottom: 18px;
    right: 18px;
  }
`;
