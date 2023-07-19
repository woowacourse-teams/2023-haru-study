import { createBrowserRouter } from 'react-router-dom';

import MakingStudy from '@Pages/MakingStudy';
import StudyBoard from '@Pages/StudyBoard';
import StudyParticipantForHost from '@Pages/StudyParticipantForHost';

import App from '../App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'studyboard',
        element: <StudyBoard />,
      },
      {
        path: 'study-making',
        element: <MakingStudy />,
      },
      {
        path: 'study-participating-host',
        element: <StudyParticipantForHost />,
      },
    ],
  },
]);

export default router;
