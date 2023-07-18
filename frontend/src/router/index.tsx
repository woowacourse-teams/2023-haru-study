import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import StudyBoard from '../pages/StudyBoard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'studyboard',
        element: <StudyBoard />,
      },
    ],
  },
]);

export default router;
