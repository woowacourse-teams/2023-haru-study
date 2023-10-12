import { Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import LoadingFallback from '@Components/common/LodingFallback/LoadingFallback';
import NotificationBoundary from '@Components/common/NotificationBoundary/NotificationBoundary';

import color from '@Styles/color';

import { FAVICON_PATH } from '@Constants/asset';
import { ROUTES_PATH } from '@Constants/routes';

import { useNotification } from '@Contexts/NotificationProvider';
import { useStudyInfo } from '@Contexts/StudyProgressProvider';

import dom from '@Utils/dom';

import PlanningForm from '../PlanningForm/PlanningForm';
import RetrospectForm from '../RetrospectForm/RetrospectForm';
import Sidebar from '../Sidebar/Sidebar';
import StudyingForm from '../StudyingForm/StudyingForm';

const StudyBoard = () => {
  const navigate = useNavigate();
  const { studyId, studyStep, progressStep } = useStudyInfo();
  const { send } = useNotification();

  if (studyStep !== 'inProgress') {
    send({ message: '이미 끝난 스터디입니다. \n스터디의 기록 페이지로 이동합니다.' });
    navigate(`${ROUTES_PATH.record}/${studyId}`);
  }

  useEffect(() => {
    dom.updateFavicon(FAVICON_PATH[progressStep]);

    return () => dom.updateFavicon(FAVICON_PATH.default);
  }, [progressStep]);

  return (
    <Container>
      <Sidebar />
      <NotificationBoundary>
        <Contents>
          {progressStep === 'planning' && <PlanningForm />}
          {progressStep === 'studying' && (
            <Suspense fallback={<LoadingFallback circleColor={color.red[500]} />}>
              <StudyingForm />
            </Suspense>
          )}
          {progressStep === 'retrospect' && <RetrospectForm />}
        </Contents>
      </NotificationBoundary>
    </Container>
  );
};

export default StudyBoard;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const Contents = styled.section`
  width: calc(100% - 590px);
  height: 100vh;

  background-color: ${color.neutral[100]};

  padding: 40px 85px;

  @media screen and (max-width: 768px) {
    width: 100%;
    height: calc(100vh - 130px);

    padding: 30px 20px;
  }
`;
