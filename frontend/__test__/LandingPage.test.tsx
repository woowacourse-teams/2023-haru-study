import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { MemoryRouter } from 'react-router-dom';

import Landing from '@Pages/Landing';

import MemberInfoProvider from '@Contexts/MemberInfoProvider';
import ModalProvider from '@Contexts/ModalProvider';

const server = setupServer(
  rest.get('/api/me', (_, res, ctx) => {
    return res(ctx.json(null));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('랜딩 페이지 테스트', () => {
  test('로그인을 하지 않았다면 하루스터디 시작하기 버튼이 보여진다.', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <ModalProvider>
          <MemberInfoProvider>
            <Landing />
          </MemberInfoProvider>
        </ModalProvider>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getAllByRole('button')[0].textContent).toBe('하루스터디 시작하기');
    });
  });
});
