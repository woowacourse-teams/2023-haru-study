import { createBrowserRouter } from 'react-router-dom';

import CreateStudy from '@Pages/CreateStudy';
import Landing from '@Pages/Landing';
import StudyBoard from '@Pages/StudyBoard';
import StudyParticipation from '@Pages/StudyParticipant';
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
    ],
  },
]);

export default router;
