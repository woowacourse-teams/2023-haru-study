import { useNavigate } from 'react-router-dom';
import { css, styled } from 'styled-components';

import GuideContents from '@Components/board/GuideContents/GuideContents';
import Sidebar from '@Components/board/Sidebar/Sidebar';
import CircularProgress from '@Components/common/CircularProgress/CircularProgress';

import useStudyBoard from '@Hooks/board/useStudyBoard';

import color from '@Styles/color';

import { ROUTES_PATH } from '@Constants/routes';

const StudyBoard = () => {
  const navigate = useNavigate();
  const { studyInfo, progressInfo, error, changeNextStep } = useStudyBoard();

  if (error) {
    alert(error.message);
    navigate(ROUTES_PATH.landing);
  }

  if (studyInfo === null || progressInfo === null) {
    return (
      <LoadingLayout>
        <CircularProgress
          size="x-large"
          $style={css`
            border: 2px solid ${color.blue[500]};
            border-color: ${color.blue[500]} transparent transparent transparent;
          `}
        />
      </LoadingLayout>
    );
  }

  if (progressInfo.step === 'done') {
    alert('이미 끝난 스터디입니다.');
    navigate(`/record/${studyInfo.studyId}`);
    return <></>;
  }

  return (
    <Layout>
      <Sidebar step={progressInfo.step} cycle={progressInfo.currentCycle} studyMinutes={studyInfo.timePerCycle} />
      <Contents>
        <GuideContents studyInfo={studyInfo} progressInfo={progressInfo} changeNextStep={changeNextStep} />
      </Contents>
    </Layout>
  );
};

export default StudyBoard;

const Layout = styled.div`
  width: 100%;
  display: flex;
`;

const Contents = styled.section`
  width: calc(100% - 590px);
  min-width: 670px;
  height: 100vh;

  background-color: ${color.neutral[100]};
`;

const LoadingLayout = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;
