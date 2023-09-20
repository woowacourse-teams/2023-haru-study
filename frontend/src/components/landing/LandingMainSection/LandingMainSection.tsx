import { styled } from 'styled-components';

import Image from '@Components/common/Image/Image';
import Typography from '@Components/common/Typography/Typography';

import color from '@Styles/color';

import ArrowIcon from '@Assets/icons/ArrowIcon';
import heroImageJpg from '@Assets/image/heroImage.jpg';
import heroImageWebp from '@Assets/image/heroImage.webp';

import LandingButton from '../LandingButton/LandingButton';

const LandingMainSection = () => {
  return (
    <main>
      <LandingHeader>
        <LandingContents>
          <Typography variant="h2">
            <Emphasis>하루</Emphasis>스터디만의
            <br />
            학습 사이클을 통해
            <br />
            효율적으로 학습해보세요.
          </Typography>
          <LandingButton />
        </LandingContents>
        <HeroImage>
          <Image originUrl={heroImageJpg} webpUrl={heroImageWebp} alt="목표, 학습, 회고 스탭" />
        </HeroImage>
      </LandingHeader>
      <LoadMoreContents>
        <Typography variant="p2">하루스터디만의 학습 사이클이란?</Typography>
        <ArrowIcon direction="down" />
      </LoadMoreContents>
    </main>
  );
};

export default LandingMainSection;

const LandingHeader = styled.div`
  height: calc(100vh - 240px);

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LandingContents = styled.div`
  width: 40%;

  display: flex;
  flex-direction: column;
  gap: 40px;
  align-self: center;

  h2 {
    font-weight: 500;
  }

  @media screen and (max-width: 768px) {
    width: 100%;

    justify-self: center;
    text-align: center;

    h2 {
      font-size: 28px;
    }
  }
`;

const HeroImage = styled.div`
  width: 50%;

  @media screen and (max-width: 768px) {
    display: none;
    width: 0;
  }
`;

const LoadMoreContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Emphasis = styled.span`
  color: ${color.blue[500]};
`;
