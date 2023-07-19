import { createBrowserRouter } from 'react-router-dom';

import Landing from '@Pages/Landing';

import App from '../App';
import StudyBoard from '../pages/StudyBoard';

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
    ],
  },
]);

export default router;
