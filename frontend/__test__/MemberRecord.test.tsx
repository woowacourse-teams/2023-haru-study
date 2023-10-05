import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { MemoryRouter } from 'react-router-dom';

import MemberRecord from '@Pages/MemberRecord';

import MemberInfoProvider from '@Contexts/MemberInfoProvider';
import ModalProvider from '@Contexts/ModalProvider';
import NotificationProvider from '@Contexts/NotificationProvider';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

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

describe('나의 스터디 기록 페이지 테스트', () => {
  test('나의 스터디로 이동하면 달력과 목록을 선택할 수 있는 버튼이 보여진다.', async () => {
    server.use(
      rest.get('/api/me', (_, res, ctx) => {
        return res(ctx.json(USER_MOCK));
      }),
    );

    render(
      <MemoryRouter initialEntries={['/member-record']}>
        <ModalProvider>
          <NotificationProvider>
            <MemberInfoProvider>
              <MemberRecord />
            </MemberInfoProvider>
          </NotificationProvider>
        </ModalProvider>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText('달력')).toBeInTheDocument();
      expect(screen.getByText('목록')).toBeInTheDocument();
    });
  });
});
