import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import Landing from '@Pages/Landing';

test('test', async () => {
  render(<Landing />);

  const title = await screen.findByRole('heading');

  expect(title).toHaveTextContent('하루 스터디');
});
