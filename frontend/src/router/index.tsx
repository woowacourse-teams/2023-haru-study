import { createBrowserRouter } from 'react-router-dom';

import Auth from '@Pages/Auth';
import CreateStudy from '@Pages/CreateStudy';
import Landing from '@Pages/Landing';
import Login from '@Pages/Login';
import MemberRecord from '@Pages/MemberRecord';
import StudyBoard from '@Pages/StudyBoard';
import StudyParticipation from '@Pages/StudyParticipation';
import StudyPreparation from '@Pages/StudyPreparation';
import StudyRecord from '@Pages/StudyRecord';

import { ROUTES_PATH } from '@Constants/routes';

import App from '../App';

const router = createBrowserRouter([
  {
    path: ROUTES_PATH.landing,
    element: <App />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: ROUTES_PATH.login,
        element: <Login />,
      },
      {
        path: ROUTES_PATH.auth,
        element: <Auth />,
      },
      {
        path: `${ROUTES_PATH.board}/:studyId`,
        element: <StudyBoard />,
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
