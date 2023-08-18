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
      <ImageBox>
        <img src={HeroImage} alt="" />
        <Typography variant="p2">작가 jcomp 출처 Freepik</Typography>
      </ImageBox>
    </HeroContainer>
  );
};

export default Hero;

const HeroContainer = styled.div`
  position: relative;

  background-color: ${color.blue[500]};
`;

const SloganContainer = styled.div`
  position: absolute;

  top: 12%;
  left: 15%;

  h3 {
    font-size: 64px;
    font-weight: 600;
    color: ${color.white};
    line-height: 110%;
  }
`;

const ImageBox = styled.div`
  position: absolute;

  left: 50%;
  bottom: 10px;

  transform: translate(-50%, 0);

  width: 75%;

  p {
    float: right;
    opacity: 0.2;
  }
`;

const Emphasis = styled.span`
  color: ${color.yellow};
`;
