import { styled } from 'styled-components';

import Hero from '@Components/landing/Hero/Hero';
import LandingContents from '@Components/landing/LandingContents/LandingContents';

const Landing = () => {
  return (
    <LandingLayout>
      <Hero />
      <LandingContents />
    </LandingLayout>
  );
};

export default Landing;

const LandingLayout = styled.div`
  display: grid;
  grid-template-columns: auto 450px;

  height: 100vh;
`;
