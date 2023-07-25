import { createBrowserRouter } from 'react-router-dom';

import Landing from '@Pages/Landing';
import StudyBoard from '@Pages/StudyBoard';
import StudyMaking from '@Pages/StudyMaking';
import StudyParticipant from '@Pages/StudyParticipant';
import StudyParticipantForHost from '@Pages/StudyParticipantForHost';

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
        path: 'study-making',
        element: <StudyMaking />,
      },
      {
        path: 'study-participating-host',
        element: <StudyParticipantForHost />,
      },
      {
        path: 'study-participating',
        element: <StudyParticipant />,
      },
    ],
  },
]);

export default router;
