import { Link } from 'react-router-dom';
import { css, styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import Header from '@Components/common/Header/Header';
import Typography from '@Components/common/Typography/Typography';
import MemberProfile from '@Components/landing/MemberProfile/MemberProfile';

import color from '@Styles/color';

import { ROUTES_PATH } from '@Constants/routes';

import DownArrowIcon from '@Assets/icons/DownArrowIcon';
import haruServiceImage from '@Assets/image/haruServiceImage.png';
import planningStep from '@Assets/image/planningStep.png';
import retrospectStep from '@Assets/image/retrospectStep.png';
import studyingStep from '@Assets/image/studyingStep.png';

const Landing = () => {
  return (
    <>
      <LandingHeader>
        <Header />
        <MemberProfile />
      </LandingHeader>
      <LandingMainSection>
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
            하루스터디 어쩌구 설명 하루스터디 어쩌구 설명 하루스터디 어쩌구 설명
          </Typography>
          <ButtonContainer>
            <Link to={ROUTES_PATH.create}>
              <Button variant="primary">스터디 개설하기</Button>
            </Link>
            <Link to={ROUTES_PATH.participation}>
              <Button variant="outlined">스터디 참여하기</Button>
            </Link>
          </ButtonContainer>
        </LandingContents>
        <img src={haruServiceImage} alt="" />
        <LoadMoreContents>
          <Typography variant="p2">하루 스터디만의 학습 사이클이란?</Typography>
          <DownArrowIcon color={color.black} />
        </LoadMoreContents>
      </LandingMainSection>
      <HaruStudyGuides>
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
      </HaruStudyGuides>
    </>
  );
};

export default Landing;

const LandingHeader = styled.div`
  display: flex;
  align-items: center;

  padding-right: 40px;
`;

const LandingMainSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  align-items: center;
  justify-items: center;
  column-gap: 40px;
  row-gap: 40px;

  padding: 0px 80px;

  height: calc(100vh - 140px);
  min-height: 800px;

  img {
    justify-self: flex-end;

    width: 800px;
    height: 600px;
  }
`;

const LandingContents = styled.div`
  justify-self: flex-start;

  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const LoadMoreContents = styled.div`
  grid-column: 1 / -1;
  justify-items: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  svg {
    cursor: pointer;
  }
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 10px;
`;

const HaruStudyGuides = styled.section`
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
  }
`;

const GuideContents = styled.div`
  p {
    margin-top: 20px;
  }
`;
