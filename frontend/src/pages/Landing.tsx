import { useState } from 'react';
import { styled } from 'styled-components';

import Footer from '@Components/common/Footer/Footer';
import Header from '@Components/common/Header/Header';
import GuideSection from '@Components/landing/GuideSection/GuideSection';
import LandingMainSection from '@Components/landing/LandingMainSection/LandingMainSection';
import MemberProfile from '@Components/landing/MemberProfile/MemberProfile';
import SideLink from '@Components/landing/SideLink/SideLik';
import StartSection from '@Components/landing/StartSection/StartSection';

import { useNotification } from '@Contexts/NotificationProvider';

const Landing = () => {
  const { send } = useNotification();
  const [number, setNumber] = useState(1);

  return (
    <>
      <button
        onClick={() => {
          send({
            type: 'error',
            message: String(number),
          });
          setNumber((prev) => prev + 1);
        }}
      >
        error 클릭!
      </button>
      <button
        onClick={() => {
          send({
            type: 'success',
            message: 'ㅋㅋㅋㅋ',
          });
        }}
      >
        success 클릭!
      </button>
      <LandingHeader>
        <Header />
        <MemberProfile />
      </LandingHeader>
      <LandingContents>
        <LandingMainSection />
        <GuideSection />
        <StartSection />
      </LandingContents>
      <Footer />
      <SideLink />
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
