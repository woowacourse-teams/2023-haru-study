import { styled } from 'styled-components';

import Typography from '@Components/common/Typography/Typography';

import color from '@Styles/color';

import planningStep from '@Assets/image/planningStep.png';
import retrospectStep from '@Assets/image/retrospectStep.png';
import studyingStep from '@Assets/image/studyingStep.png';

const GUIDE = [
  {
    imageUrl: planningStep,
    title: '목표 설정 단계',
    description: `목표 설정 설명 목표 설정 목표 설정 설명 목표 목표 설정 설명 목표`,
  },
  {
    imageUrl: retrospectStep,
    title: '학습 단계',
    description: `학습 단계 학습 단계 학습 단계 학습 단계 학습 단계 학습 단계 학습 단계`,
  },
  {
    imageUrl: studyingStep,
    title: '회고 단계',
    description: `회고 단계 회고 단계 회고 단계 회고 단계 회고 단계 회고 단계 회고 단계 회고 단계 회고 단계 회고 단계 회고 단계 회고 단계`,
  },
] as const;

const GuideSection = () => {
  return (
    <Layout>
      {GUIDE.map(({ imageUrl, title, description }) => {
        return (
          <Guide key={title}>
            <img src={imageUrl} alt={title} />
            <GuideContents>
              <Typography variant="h2">{title}</Typography>
              <Typography variant="p2">{description}</Typography>
            </GuideContents>
          </Guide>
        );
      })}
    </Layout>
  );
};

export default GuideSection;

const Layout = styled.section`
  display: flex;
  flex-direction: column;
  gap: 135px;

  padding: 135px 60px;

  :nth-child(2n) {
    flex-direction: row-reverse;
  }

  @media screen and (max-width: 800px) {
    :nth-child(2n) {
      flex-direction: column;
    }
  }
`;

const Guide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 80px;

  img {
    width: 50%;
    border-radius: 20px;

    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  }

  @media screen and (max-width: 800px) {
    flex-direction: column;
    gap: 60px;
    img {
      width: 90%;
    }
  }
`;

const GuideContents = styled.div`
  width: 40%;

  p {
    margin-top: 20px;
    color: ${color.neutral[500]};
  }

  @media screen and (max-width: 800px) {
    width: 90%;
  }
`;
