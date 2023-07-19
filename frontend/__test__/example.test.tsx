import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';

import Showcase from '@Components/landing/Showcase';

test('test', async () => {
  render(<Showcase />);

  const text = await screen.findByRole('heading');

  expect(text).toHaveTextContent('스터디');
});
