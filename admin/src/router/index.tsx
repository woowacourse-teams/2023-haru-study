import { createBrowserRouter } from 'react-router-dom';

import { ROUTES_PATH } from '@Constants/routes';

import App from '../App';

const router = createBrowserRouter([
  {
    path: ROUTES_PATH.home,
    element: <App />,
    children: [],
  },
]);

export default router;
