import { createBrowserRouter } from 'react-router-dom';

import Landing from '@Pages/Landing';
import StudyBoard from '@Pages/StudyBoard';
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
        path: 'studyboard',
        element: <StudyBoard />,
      },
      {
        path: 'study-record/:studyId',
        element: <StudyRecord />,
      },
    ],
  },
]);

export default router;
