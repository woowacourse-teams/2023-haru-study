import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { MemoryRouter } from 'react-router-dom';

import Landing from '@Pages/Landing';

import MemberInfoProvider from '@Contexts/MemberInfoProvider';
import ModalProvider from '@Contexts/ModalProvider';

const USER_MOCK = {
  memberId: '1',
  name: '맘모스',
  email: 'haru12@gmail.com',
  imageUrl: 'https://lh3.google.com/u/0/ogw/AGvuzYZKngVdZecWrpGTnHj7hQRtO5p9tjelI5lvCcsk=s64-c-mo',
  loginType: 'google',
};

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
      expect(screen.getByRole('button').textContent).toBe('하루스터디 시작하기');
    });
  });

  test('로그인을 했다면 하루스터디 스터디 개설하기, 스터디 참여하기 버튼이 보여진다.', async () => {
    server.use(
      rest.get('/api/me', (_, res, ctx) => {
        return res(ctx.json(USER_MOCK));
      }),
    );

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
      screen.getAllByRole('button').forEach((button, index) => {
        const buttonText = index === 0 ? '스터디 개설하기' : '스터디 참여하기';
        expect(button.textContent).toBe(buttonText);
      });
    });
  });
});
