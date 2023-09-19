import { styled } from 'styled-components';

import Footer from '@Components/common/Footer/Footer';
import Header from '@Components/common/Header/Header';
import ChattingLink from '@Components/landing/ChattingLink/ChattingLink';
import GuideSection from '@Components/landing/GuideSection/GuideSection';
import LandingMainSection from '@Components/landing/LandingMainSection/LandingMainSection';
import MemberProfile from '@Components/landing/MemberProfile/MemberProfile';

const Landing = () => {
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
      <ChattingLink />
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
