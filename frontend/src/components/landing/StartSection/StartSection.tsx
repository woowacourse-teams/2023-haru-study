import { styled } from 'styled-components';

import Typography from '@Components/common/Typography/Typography';

import LandingButton from '../LandingButton/LandingButton';

const StartSection = () => {
  return (
    <Layout>
      <Typography variant="h4">하루스터디를 시작해볼까요?</Typography>
      <LandingButton />
    </Layout>
  );
};

export default StartSection;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  padding: 50px 0px 160px;

  @media screen and (max-width: 768px) {
    padding: 60px 0px 120px;
  }

  h4 {
    font-weight: 500;

    @media screen and (max-width: 768px) {
      font-size: 2.4rem;
    }
  }
`;
