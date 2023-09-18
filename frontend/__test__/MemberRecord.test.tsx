import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { MemoryRouter } from 'react-router-dom';

import MemberRecord from '@Pages/MemberRecord';

import MemberInfoProvider from '@Contexts/MemberInfoProvider';
import ModalProvider from '@Contexts/ModalProvider';

const STUDY_LIST = {
  studies: [
    {
      studyId: '1',
      name: '안오면 지상렬',
      totalCycle: 3,
      timePerCycle: 60,
      createdDateTime: '2023-08-16T13:33:02.810Z',
    },
  ],
};

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

  rest.get('/api/studies', (_, res, ctx) => {
    return res(ctx.json(null));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('나의 스터디 기록 페이지 테스트', () => {
  test('나의 스터디로 이동하면 참여한 스터디의 이름과 진행한 날짜, 정보가 보여진다.', async () => {
    server.use(
      rest.get('/api/me', (_, res, ctx) => {
        return res(ctx.json(USER_MOCK));
      }),

      rest.get('/api/studies', (_, res, ctx) => {
        return res(ctx.json(STUDY_LIST));
      }),
    );

    render(
      <MemoryRouter initialEntries={['/member-record']}>
        <ModalProvider>
          <MemberInfoProvider>
            <MemberRecord />
          </MemberInfoProvider>
        </ModalProvider>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 6 }).textContent).toBe('안오면 지상렬 스터디');
      expect(screen.getByTestId('progress-date').textContent).toBe('2023년 8월 16일');
    });
  });
});
