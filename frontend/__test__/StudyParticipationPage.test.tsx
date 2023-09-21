import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

import StudyParticipation from '@Pages/StudyParticipation';

import MemberInfoProvider from '@Contexts/MemberInfoProvider';
import ModalProvider from '@Contexts/ModalProvider';

describe('스터디 참여 페이지 테스트', () => {
  test('참여코드 입력 폼이 보여진다.', async () => {
    render(
      <MemoryRouter initialEntries={['/create']}>
        <ModalProvider>
          <MemberInfoProvider>
            <StudyParticipation />
          </MemberInfoProvider>
        </ModalProvider>
      </MemoryRouter>,
    );

    expect(screen.getByText('스터디장에게 받은 참여코드를 입력하세요.')).toBeInTheDocument();
  });
});
