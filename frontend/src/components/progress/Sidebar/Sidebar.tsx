import { css, styled } from 'styled-components';

import Button from '@Components/common/Button/Button';
import Typography from '@Components/common/Typography/Typography';

import color from '@Styles/color';

import { useModal } from '@Contexts/ModalProvider';
import { useStudyInfo } from '@Contexts/StudyProgressProvider';

import type { Step } from '@Types/study';

import StudyInfoModal from '../StudyInfoModal/StudyInfoModal';
import Timer from '../Timer/Timer';

const SIDEBAR_INFO: Record<Step, { theme: string; buttonColor: string; paragraph: string }> = {
  planning: {
    theme: color.blue[500],
    buttonColor: color.blue[400],
    paragraph: '학습을 진행하기 전,\n학습 목표를 설정해주세요.',
  },
  studying: {
    theme: color.red[600],
    buttonColor: color.red[400],
    paragraph: '목표 달성을 위해\n학습을 바로 진행하세요.',
  },
  retrospect: {
    theme: color.teal[600],
    buttonColor: color.teal[400],
    paragraph: '분간의 학습이\n어땠는지 회고해보세요.',
  },
};

const Sidebar = () => {
  const { openModal } = useModal();

  const studyInfo = useStudyInfo();
  const { timePerCycle, currentCycle, progressStep, lastModifiedDate } = studyInfo;

  const paragraph =
    progressStep === 'retrospect'
      ? `${timePerCycle}${SIDEBAR_INFO[progressStep].paragraph}`
      : SIDEBAR_INFO[progressStep].paragraph;

  const openStudyInfo = () => {
    openModal(<StudyInfoModal studyInfo={studyInfo} />);
  };

  return (
    <Layout background={SIDEBAR_INFO[progressStep].theme}>
      <Typography
        variant="h4"
        color={color.white}
        $style={css`
          margin-right: auto;
          white-space: pre-line;
        `}
        tabIndex={0}
        aria-label={paragraph}
        aria-live="assertive"
      >
        {paragraph}
      </Typography>
      <Timer
        studyMinutes={timePerCycle}
        step={progressStep}
        currentCycle={currentCycle}
        lastModifiedDate={lastModifiedDate}
      />
      <StudyInfoButton variant="primary" background={SIDEBAR_INFO[progressStep].buttonColor} onClick={openStudyInfo}>
        스터디 현황
      </StudyInfoButton>
    </Layout>
  );
};

export default Sidebar;

const Layout = styled.div<{ background: string }>`
  width: 590px;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  padding: 80px 90px 40px 80px;

  background-color: ${({ background }) => background};

  transition: background-color 0.5s ease-in-out;

  @media screen and (max-width: 768px) {
    width: 100%;
    height: 130px;

    flex-direction: row;

    padding: 30px 20px 20px 20px;

    h4 {
      display: none;
    }

    p {
      font-size: 2rem;
    }
  }
`;

const StudyInfoButton = styled(Button)<{ background: string }>`
  background-color: ${({ background }) => background};

  &:hover:enabled {
    background-color: ${({ background }) => background};
  }

  @media screen and (max-width: 768px) {
    width: max-content;

    padding: 12px 18px;

    font-size: 2rem;
  }
`;
