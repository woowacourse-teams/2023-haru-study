import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import AlertErrorBoundary from '@Components/common/AlertErrorBoundary/AlertErrorBoundary';

import color from '@Styles/color';

import { useProgressInfo, useStudyInfo } from '@Contexts/StudyProgressProvider';

import PlanningForm from '../PlanningForm/PlanningForm';
import RetrospectForm from '../RetrospectForm/RetrospectForm';
import Sidebar from '../Sidebar/Sidebar';
import StudyingForm from '../StudyingForm/StudyingForm';

const StudyBoard = () => {
  const navigate = useNavigate();
  const { studyId } = useStudyInfo();
  const { step } = useProgressInfo();

  if (step === 'done') {
    alert('이미 끝난 스터디입니다.');
    navigate(`/record/${studyId}`);
    return;
  }

  return (
    <Container>
      <Sidebar />
      <AlertErrorBoundary>
        <Contents>
          {step === 'planning' && <PlanningForm />}
          {step === 'studying' && <StudyingForm />}
          {step === 'retrospect' && <RetrospectForm />}
        </Contents>
      </AlertErrorBoundary>
    </Container>
  );
};

export default StudyBoard;

const Container = styled.div`
  width: 100%;
  display: flex;
`;

const Contents = styled.section`
  width: calc(100% - 590px);
  min-width: 670px;
  height: 100vh;

  background-color: ${color.neutral[100]};
`;
