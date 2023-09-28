import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Landing from '@Pages/Landing';
import NotFound from '@Pages/NotFound';

import { ROUTES_PATH } from '@Constants/routes';

import App from '../App';

const Auth = lazy(() => import('@Pages/Auth'));
const StudyRecord = lazy(() => import('@Pages/StudyRecord'));
const StudyMode = lazy(() => import('@Pages/StudyMode'));
const CreateStudy = lazy(() => import('@Pages/CreateStudy'));
const MemberRecord = lazy(() => import('@Pages/MemberRecord'));
const StudyProgress = lazy(() => import('@Pages/StudyProgress'));
const StudyPreparation = lazy(() => import('@Pages/StudyPreparation'));
const StudyParticipation = lazy(() => import('@Pages/StudyParticipation'));

const router = createBrowserRouter([
  {
    path: ROUTES_PATH.landing,
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: ROUTES_PATH.auth,
        element: <Auth />,
      },
      {
        path: `${ROUTES_PATH.progress}/:studyId`,
        element: <StudyProgress />,
      },
      {
        path: `${ROUTES_PATH.record}/:studyId`,
        element: <StudyRecord />,
      },
      {
        path: ROUTES_PATH.create,
        element: <CreateStudy />,
      },
      {
        path: `${ROUTES_PATH.preparation}/:studyId`,
        element: <StudyPreparation />,
      },
      {
        path: ROUTES_PATH.participation,
        element: <StudyParticipation />,
      },
      {
        path: ROUTES_PATH.memberRecord,
        element: <MemberRecord />,
      },
      {
        path: ROUTES_PATH.mode,
        element: <StudyMode />,
      },
    ],
  },
]);

export default router;
