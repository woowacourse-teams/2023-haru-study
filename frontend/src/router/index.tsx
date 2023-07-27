import { createBrowserRouter } from 'react-router-dom';

import Landing from '@Pages/Landing';
import StudyBoard from '@Pages/StudyBoard';
import StudyMaking from '@Pages/StudyMaking';
import StudyParticipant from '@Pages/StudyParticipant';
import StudyPreparation from '@Pages/StudyPreparation';
import StudyRecord from '@Pages/StudyRecord';

import App from '../App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'studyboard/:studyId',
        element: <StudyBoard />,
      },
      {
        path: 'study-record/:studyId',
        element: <StudyRecord />,
      },
      {
        path: 'study-making',
        element: <StudyMaking />,
      },
      {
        path: 'study-preparation/:studyId',
        element: <StudyPreparation />,
      },
      {
        path: 'study-participating',
        element: <StudyParticipant />,
      },
    ],
  },
]);

export default router;
