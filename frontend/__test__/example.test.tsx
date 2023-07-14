import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/App';

test('test', async () => {
  render(<App />);

  const title = await screen.findByRole('heading');

  expect(title).toHaveTextContent('Welcome Haru Study!');
});
