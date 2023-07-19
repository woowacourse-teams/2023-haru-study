import { styled } from 'styled-components';

import Typography from '@Components/common/Typography/Typography';

import color from '@Styles/color';

import LandingShowcaseImage from '@Assets/image/showcase.png';

const Showcase = () => {
  return (
    <ShowcaseContainer>
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
        <img src={LandingShowcaseImage} alt="랜딩 쇼케이스" />
        <Typography variant="p2">작가 jcomp 출처 Freepik</Typography>
      </ShowcaseImageContainer>
    </ShowcaseContainer>
  );
};

export default Showcase;

const ShowcaseContainer = styled.div`
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

const ShowcaseImageContainer = styled.div`
  position: relative;

  display: grid;

  padding: 0px 80px;

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
