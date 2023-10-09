import { createBrowserRouter } from 'react-router-dom';

import Home from '@Pages/Home';
import Login from '@Pages/Login';

import { ROUTES_PATH } from '@Constants/routes';

import App from '../App';

const router = createBrowserRouter([
  {
    path: ROUTES_PATH.home,
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: ROUTES_PATH.login,
        element: <Login />,
      },
    ],
  },
]);

export default router;
