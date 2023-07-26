import { useNavigate } from 'react-router-dom';
import { css, styled } from 'styled-components';

import GuideContents from '@Components/board/GuideContents/GuideContents';
import Sidebar from '@Components/board/Sidebar/Sidebar';
import CircularProgress from '@Components/common/CircularProgress/CircularProgress';

import useStudyBoard from '@Hooks/board/useStudyBoard';

import color from '@Styles/color';

const StudyBoard = () => {
  const navigate = useNavigate();
  const { studyData, error, changeNextStep } = useStudyBoard();

  if (error) {
    alert(error.message);
    navigate('/');
  }

  if (studyData === null) {
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

  return (
    <Layout>
      <Sidebar step={studyData.step} cycle={studyData.currentCycle} studyMinutes={studyData.timePerCycle} />
      <Contents>
        <GuideContents studyData={studyData} changeNextStep={changeNextStep} />
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
