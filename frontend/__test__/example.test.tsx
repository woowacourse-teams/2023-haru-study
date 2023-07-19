import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import Landing from '@Pages/Landing';

test('test', async () => {
  render(<Landing />);

  const title = await screen.findAllByRole('button');

  expect(title[0]).toHaveTextContent('스터디 개설하기');
});
