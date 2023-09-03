import { css, styled } from 'styled-components';

import Typography from '@Components/common/Typography/Typography';

import color from '@Styles/color';

import planningStep from '@Assets/image/planningStep.png';
import retrospectStep from '@Assets/image/retrospectStep.png';
import studyingStep from '@Assets/image/studyingStep.png';

const GuideSection = () => {
  return (
    <Layout>
      <Guide>
        <img src={planningStep} alt="목표 설정 단계" />
        <GuideContents>
          <Typography variant="h2">목표 설정 단계</Typography>
          <Typography
            variant="p2"
            $style={css`
              color: ${color.neutral[500]};
            `}
          >
            목표 설정 설명 목표 설정 목표 설정 설명 목표 목표 설정 설명 목표
            <br />
            목표 설정 설명 목표 설정 설명 목표 설정 설명 목표 설정 설명
            <br />
            목표 설정 설명 목표 설정 설명 목표
          </Typography>
        </GuideContents>
      </Guide>
      <Guide>
        <img src={studyingStep} alt="학습 단계" />
        <GuideContents>
          <Typography variant="h2">학습 단계</Typography>
          <Typography
            variant="p2"
            $style={css`
              color: ${color.neutral[500]};
            `}
          >
            목표 설정 설명 목표 설정 목표 설정 설명 목표 목표 설정 설명 목표
            <br />
            목표 설정 설명 목표 설정 설명 목표 설정 설명 목표 설정 설명
            <br />
            목표 설정 설명 목표 설정 설명 목표
          </Typography>
        </GuideContents>
      </Guide>
      <Guide>
        <img src={retrospectStep} alt="회고 단계" />
        <GuideContents>
          <Typography variant="h2">회고 단계</Typography>
          <Typography
            variant="p2"
            $style={css`
              color: ${color.neutral[500]};
            `}
          >
            목표 설정 설명 목표 설정 목표 설정 설명 목표 목표 설정 설명 목표
            <br />
            목표 설정 설명 목표 설정 설명 목표 설정 설명 목표 설정 설명
            <br />
            목표 설정 설명 목표 설정 설명 목표
          </Typography>
        </GuideContents>
      </Guide>
    </Layout>
  );
};

export default GuideSection;

const Layout = styled.section`
  display: flex;
  flex-direction: column;
  gap: 135px;

  padding: 135px 0px;

  :nth-child(2n) {
    flex-direction: row-reverse;
  }
`;

const Guide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 80px;

  img {
    width: 750px;
    height: 437.5px;
    border-radius: 20px;

    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  }
`;

const GuideContents = styled.div`
  p {
    margin-top: 20px;
  }
`;
