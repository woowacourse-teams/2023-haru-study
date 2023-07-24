import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

import MakingStudy from '@Pages/StudyMaking';

test('스터디 개설 페이지가 잘 렌더링 되었는지 확인한다.', async () => {
  render(
    <MemoryRouter initialEntries={['/study-making']}>
      <MakingStudy />
    </MemoryRouter>,
  );

  const title = await screen.findByRole('heading');

  expect(title).toHaveTextContent('스터디 개설하기');
});
