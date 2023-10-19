import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { worker } from './mocks/worker';
import router from './router';

const container = document.getElementById('root');
const root = createRoot(container!);

if (process.env.NODE_ENV === 'development') {
  worker.start();
}

root.render(<RouterProvider router={router} />);
