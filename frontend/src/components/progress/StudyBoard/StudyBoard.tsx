/* eslint-disable react-hooks/exhaustive-deps */
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
import ProgressPolling from '../ProgressPolling/ProgressPolling';
import RetrospectForm from '../RetrospectForm/RetrospectForm';
import Sidebar from '../Sidebar/Sidebar';
import StudyingForm from '../StudyingForm/StudyingForm';

const STEP_NOTIFICATION_MESSAGE = {
  planning: '목표 설정 단계\n학습을 진행하기 전, 학습 목표를 설정해주세요.',
  studying: '학습 진행 단계\n목표 달성을 위해 학습을 바로 진행하세요.',
  retrospect: '회고 단계\n학습이 어땠는지 회고해보세요.',
};

const StudyBoard = () => {
  const navigate = useNavigate();
  const { studyId, name, studyStep, progressStep } = useStudyInfo();
  const { send } = useNotification();

  useEffect(() => {
    if (studyStep === 'waiting') {
      send({ message: '스터디가 아직 시작되지 않았습니다.\n스터디 대기방으로 이동합니다.' });
      navigate(`${ROUTES_PATH.lobby}/${studyId}`, { state: { studyName: name } });
      return;
    }

    if (studyStep === 'done') {
      send({ message: '이미 끝난 스터디입니다.\n스터디의 기록 페이지로 이동합니다.' });
      navigate(`${ROUTES_PATH.record}/${studyId}`);
      return;
    }

    dom.updateFavicon(FAVICON_PATH[progressStep]);
    send({ message: STEP_NOTIFICATION_MESSAGE[progressStep] });

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
      <ProgressPolling />
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
