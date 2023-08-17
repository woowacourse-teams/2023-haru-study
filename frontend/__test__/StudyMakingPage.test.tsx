import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

import CreateStudy from '@Pages/CreateStudy';

import ModalProvider from '@Contexts/ModalProvider';

test('스터디 개설 페이지가 잘 렌더링 되었는지 확인한다.', async () => {
  render(
    <MemoryRouter initialEntries={['/create']}>
      <ModalProvider>
        <CreateStudy />
      </ModalProvider>
    </MemoryRouter>,
  );

  const title = await screen.findAllByRole('heading');

  expect(title[1]).toHaveTextContent('스터디 개설하기');
});
