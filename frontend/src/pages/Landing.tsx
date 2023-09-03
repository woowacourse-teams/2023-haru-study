import { styled } from 'styled-components';

import Header from '@Components/common/Header/Header';
import LandingMainSection from '@Components/landing/LandingMainSection/LandingMainSection';
import MemberProfile from '@Components/landing/MemberProfile/MemberProfile';

import GuideSection from './GuideSection/GuideSection';

const Landing = () => {
  return (
    <>
      <LandingHeader>
        <Header />
        <MemberProfile />
      </LandingHeader>
      <LandingMainSection />
      <GuideSection />
    </>
  );
};

export default Landing;

const LandingHeader = styled.div`
  display: flex;
  align-items: center;

  padding-right: 40px;
`;
