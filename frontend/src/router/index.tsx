import { createBrowserRouter } from 'react-router-dom';

import MakingStudy from '@Pages/MakingStudy';
import StudyBoard from '@Pages/StudyBoard';

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
        path: 'makingstudy',
        element: <MakingStudy />,
      },
    ],
  },
]);

export default router;
