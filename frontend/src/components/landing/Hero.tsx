import { styled } from 'styled-components';

import Typography from '@Components/common/Typography/Typography';

import color from '@Styles/color';

import HeroImage from '@Assets/image/heroImage.png';

const Hero = () => {
  return (
    <HeroContainer>
      <SloganContainer>
        <Typography variant="h3">
          <Emphasis>스터디</Emphasis>에
          <br />
          필요한
          <br />
          시간
          <br />
          단, <Emphasis>하루</Emphasis>
        </Typography>
      </SloganContainer>
      <ShowcaseImageContainer>
        <ImageBox>
          <img src={HeroImage} alt="랜딩 쇼케이스" />
          <Typography variant="p2">작가 jcomp 출처 Freepik</Typography>
        </ImageBox>
      </ShowcaseImageContainer>
    </HeroContainer>
  );
};

export default Hero;

const HeroContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;

  min-width: 100%;
  padding: 40px 40px;

  background-color: ${color.blue[500]};
`;

const SloganContainer = styled.div`
  align-self: flex-end;

  position: relative;
  bottom: -30px;

  padding: 0px 120px;

  h3 {
    font-size: 64px;
    font-weight: 600;
    color: ${color.white};
    line-height: 120%;
  }
`;

const ImageBox = styled.div`
  position: relative;
  padding: 0px 80px;

  min-width: 80%;
  margin: 0 auto;
`;

const ShowcaseImageContainer = styled.div`
  display: grid;

  p {
    position: absolute;
    bottom: -30px;
    right: 80px;

    text-align: end;
    opacity: 0.2;
  }
`;

const Emphasis = styled.span`
  color: ${color.yellow};
`;
