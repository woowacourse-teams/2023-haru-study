import { createBrowserRouter } from 'react-router-dom';

import Auth from '@Pages/Auth';
import CreateStudy from '@Pages/CreateStudy';
import Landing from '@Pages/Landing';
import MemberRecord from '@Pages/MemberRecord';
import NotFound from '@Pages/NotFound';
import StudyParticipation from '@Pages/StudyParticipation';
import StudyPreparation from '@Pages/StudyPreparation';
import StudyProgress from '@Pages/StudyProgress';
import StudyRecord from '@Pages/StudyRecord';

import { ROUTES_PATH } from '@Constants/routes';

import App from '../App';

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
    ],
  },
]);

export default router;
