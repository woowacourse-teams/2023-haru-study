import { Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import AlertErrorBoundary from '@Components/common/AlertErrorBoundary/AlertErrorBoundary';
import LoadingFallback from '@Components/common/LodingFallback/LoadingFallback';

import color from '@Styles/color';

import { FAVICON_PATH } from '@Constants/asset';
import { ROUTES_PATH } from '@Constants/routes';

import { useProgressInfo, useStudyInfo } from '@Contexts/StudyProgressProvider';

import dom from '@Utils/dom';

import PlanningForm from '../PlanningForm/PlanningForm';
import RetrospectForm from '../RetrospectForm/RetrospectForm';
import Sidebar from '../Sidebar/Sidebar';
import StudyingForm from '../StudyingForm/StudyingForm';

const StudyBoard = () => {
  const navigate = useNavigate();
  const { studyId } = useStudyInfo();
  const { step } = useProgressInfo();

  useEffect(() => {
    if (step === 'done') return;
    dom.updateFavicon(FAVICON_PATH[step]);

    return () => dom.updateFavicon(FAVICON_PATH.default);
  }, [step]);

  if (step === 'done') {
    alert('이미 끝난 스터디입니다.');
    navigate(`${ROUTES_PATH.record}/${studyId}`);
    return;
  }

  return (
    <Container>
      <Sidebar />
      <AlertErrorBoundary>
        <Contents>
          {step === 'planning' && <PlanningForm />}
          {step === 'studying' && (
            <Suspense fallback={<LoadingFallback circleColor={color.red[500]} />}>
              <StudyingForm />
            </Suspense>
          )}
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
