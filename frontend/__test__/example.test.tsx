import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';

import Hero from '@Components/landing/Hero/Hero';

test('test', async () => {
  render(<Hero />);

  const text = await screen.findByRole('heading');

  expect(text).toHaveTextContent('스터디');
});
