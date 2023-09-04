import { css, styled } from 'styled-components';

import Typography from '@Components/common/Typography/Typography';

import color from '@Styles/color';

import ArrowIcon from '@Assets/icons/ArrowIcon';
import haruServiceImage from '@Assets/image/haruServiceImage.png';

import LandingButton from '../LandingButton/LandingButton';

const LandingMainSection = () => {
  return (
    <Layout>
      <LandingContents>
        <Typography variant="h2">
          하루스터디만의 학습 사이클로
          <br />
          학습 효율성을 끌어올립니다.
        </Typography>
        <Typography
          variant="p2"
          $style={css`
            color: ${color.neutral[500]};
          `}
        >
          하루스터디 어쩌구 설명
          <br />
          하루스터디 어쩌구 설명 하루스터디 어쩌구 설명 하루스터디 어쩌구
        </Typography>
        <LandingButton />
      </LandingContents>
      <img src={haruServiceImage} alt="목표, 학습, 회고 스탭" />
      <LoadMoreContents>
        <Typography variant="p2">하루 스터디만의 학습 사이클이란?</Typography>
        <ArrowIcon direction="down" />
      </LoadMoreContents>
    </Layout>
  );
};

export default LandingMainSection;

const Layout = styled.section`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  align-items: center;
  justify-items: center;
  column-gap: 40px;
  row-gap: 40px;

  padding: 0px 80px;

  height: calc(100vh - 140px);
  min-height: 500px;

  img {
    justify-self: flex-end;
  }

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
    img {
      display: none;
    }
  }
`;

const LandingContents = styled.div`
  justify-self: flex-start;

  display: flex;
  flex-direction: column;
  gap: 40px;

  @media screen and (max-width: 800px) {
    justify-self: center;
  }
`;

const LoadMoreContents = styled.div`
  grid-column: 1 / -1;
  justify-items: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
