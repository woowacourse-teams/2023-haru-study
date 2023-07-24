import { createBrowserRouter } from 'react-router-dom';

import Landing from '@Pages/Landing';
import StudyBoard from '@Pages/StudyBoard';
import StudyMaking from '@Pages/StudyMaking';
import StudyParticipantForHost from '@Pages/StudyParticipantForHost';
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
        path: 'study-participating-host',
        element: <StudyParticipantForHost />,
      },
    ],
  },
]);

export default router;
