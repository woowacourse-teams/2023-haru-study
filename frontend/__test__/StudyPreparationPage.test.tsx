import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { MemoryRouter } from 'react-router-dom';

import StudyPreparation from '@Pages/StudyPreparation';

import MemberInfoProvider from '@Contexts/MemberInfoProvider';
import ModalProvider from '@Contexts/ModalProvider';
import NotificationProvider from '@Contexts/NotificationProvider';

import { API_BASIC_URL } from '@Apis/index';

jest.mock('react-router-dom', () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return {
    ...jest.requireActual('react-router-dom'),
    useLocation: () => {
      return {
        state: { studyName: '하루스터디' },
      };
    },
    useParams: () => ({ studyId: '1' }),
  };
});

const server = setupServer(
  rest.get(`${API_BASIC_URL}/temp/studies/:studyId/participants`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ participants: null }));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('스터디 준비 페이지 테스트', () => {
  test('요청한 Participants 데이터가 없으면 닉네임 입력 폼이 보여진다.', async () => {
    render(
      <MemoryRouter initialEntries={[`/preparation/1`]}>
        <NotificationProvider>
          <ModalProvider>
            <MemberInfoProvider>
              <StudyPreparation />
            </MemberInfoProvider>
          </ModalProvider>
        </NotificationProvider>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText('스터디에서 사용할 닉네임')).toBeInTheDocument();
    });
  });

  test('요청한 Participants 데이터가 있다면 이미 스터디 정보가 있다는 폼이 보여진다.', async () => {
    server.use(
      rest.get(`${API_BASIC_URL}/temp/studies/:studyId/participants`, (_, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({ participants: [{ participantId: 1, nickname: '하루', isHost: false }] }),
        );
      }),
    );

    render(
      <MemoryRouter initialEntries={[`/preparation/1`]}>
        <NotificationProvider>
          <ModalProvider>
            <MemberInfoProvider>
              <StudyPreparation />
            </MemberInfoProvider>
          </ModalProvider>
        </NotificationProvider>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText('하루')).toBeInTheDocument();
      expect(screen.getByText('학습을 이어서 진행 하시겠습니까?')).toBeInTheDocument();
    });
  });
});
