import { createRoot } from 'react-dom/client';
import { worker } from './mocks/worker';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!);

if (process.env.NODE_ENV === 'development') {
  worker.start();
}

root.render(<App />);
