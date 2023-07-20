import { styled } from 'styled-components';

import Contents from '@Components/landing/Contents';
import Hero from '@Components/landing/Hero';

const Landing = () => {
  return (
    <LandingLayout>
      <Hero />
      <Contents />
    </LandingLayout>
  );
};

export default Landing;

const LandingLayout = styled.div`
  display: grid;
  grid-template-columns: auto 450px;

  min-height: 100vh;
  max-height: 100vh;
`;
