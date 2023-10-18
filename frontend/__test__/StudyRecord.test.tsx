import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { MemoryRouter } from 'react-router-dom';

import StudyRecord from '@Pages/StudyRecord';

import MemberInfoProvider from '@Contexts/MemberInfoProvider';
import ModalProvider from '@Contexts/ModalProvider';

import { API_BASIC_URL } from '@Apis/index';

import type { Participant } from '@Types/study';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock('react-router-dom', () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return {
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({ studyId: '1' }),
  };
});

const STUDY_CONTENT = {
  content: [
    {
      cycle: 1,
      plan: {
        toDo: '모던 자바스크립트 15장 정독(let, const 키워드와 블록 레벨 스코프)',
        completionCondition:
          '블록 레벨 스코프가 무엇인지 한 줄로 설명할 수 있다. -> 예시를 통해 1분 이내로 설명할 수 있다.',
        expectedProbability: '80% 이미 학습한 내용이기 때문이다.',
        expectedDifficulty: '개념을 학습한 후, 나만의 언어로 정리하는 것',
        whatCanYouDo: '핵심적인 내용을 먼저 정리한다.',
      },
      retrospect: {
        doneAsExpected:
          '이전에 학습한 내용이여서 이해는 어렵지 않았지만 짧게 정리를 하고 이를 습득하는데 어려움이 있었다. 실제로 누군가에게 설명을 할 수 있는지 확인해봐야겠다.',
        experiencedDifficulty: '깔끔한 문장으로 정리하는 것, 누군가에게 과연 매끄럽게 설명을 할 수 있을지',
        lesson: 'var키워드는 혼란만 초래할 뿐이다. var 키워드는 브라우저에게 맡기자',
      },
    },
    {
      cycle: 2,
      plan: {
        toDo: '알고리즘 한 문제를 푼다',
        completionCondition: '알고리즘 한 문제에 대해 모든 테스트케이스가 통과해야 한다.',
        expectedProbability: '80% 도전해볼만한 가치가 있기 때문',
        expectedDifficulty: '아직 잘 모르는 알고리즘 개념이 나오면 힘들 것 같다.',
        whatCanYouDo: '문제 설명 부터 잘 보자.',
      },
      retrospect: {
        doneAsExpected: '로직은 맞는거같은데 시간초과 때문에 통과하지는 못했습니다',
        experiencedDifficulty:
          '복병은 시간초과를 예상하지 않고 코드를 짰다는 것..? 알고리즘에 익숙하지 않아 로직에만 집중하다보니 그런 것 같습니다',
        lesson: ' 로직이 맞다고 맞는건 아니다. 풀기전에 잘 생각해보자..',
      },
    },
    {
      cycle: 3,
      plan: {
        toDo: '미션 회고 글 포스팅',
        completionCondition: '한 챕터의 내용을 완성',
        expectedProbability: '60%',
        expectedDifficulty: '좋은 글을 쓰기 위해 고민이 많아질 수 있다.',
        whatCanYouDo: '글을 완벽하게 쓰려고 하기보단 러프하게 먼저 쓴다.',
      },
      retrospect: {
        doneAsExpected: '한 챕터의 절반 정도 작성한 것 같습니다.',
        experiencedDifficulty:
          '캡처하고 붙여 넣느라 시간이 좀 걸렸습니다. 그리고 챕터의 방향성이 조금 수정되어서 원할하게 작성하지 못했습니다.',
        lesson: '글을 한 번에 쓰려고 하지말고 중간중간 틈틈이 기록을 해놔야 할 것 같아요.',
      },
    },
  ],
};

const STUDY_MEMBERS: { participants: Participant[] } = {
  participants: [
    {
      participantId: '1',
      nickname: '노아',
      isHost: true,
    },
    {
      participantId: '2',
      nickname: '룩소',
      isHost: false,
    },
    {
      participantId: '3',
      nickname: '엽토',
      isHost: false,
    },
  ],
};

const STUDY_METADATA = {
  name: '안오면 지상렬',
  totalCycle: 3,
  timePerCycle: 25,
  createdDateTime: '2023-08-15T06:25:39.093Z',
};

const server = setupServer(
  rest.get(`${API_BASIC_URL}/studies/1/participants`, (_, res, ctx) => {
    return res(ctx.json(STUDY_MEMBERS));
  }),

  rest.get(`${API_BASIC_URL}/studies/:studyId`, (_, res, ctx) => {
    return res(ctx.json(STUDY_METADATA));
  }),

  rest.get(`${API_BASIC_URL}/studies/:studyId/contents?participantId=1`, (_, res, ctx) => {
    return res(ctx.json(STUDY_CONTENT));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('스터디 기록 페이지 테스트', () => {
  test('스터디 기록 페이지에서 스터디원을 확인할 수 있다.', async () => {
    render(
      <MemoryRouter initialEntries={['/record/1']}>
        <ModalProvider>
          <MemberInfoProvider>
            <StudyRecord />
          </MemberInfoProvider>
        </ModalProvider>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText('노아의 기록')).toBeInTheDocument();
      expect(screen.getByText('룩소의 기록')).toBeInTheDocument();
      expect(screen.getByText('엽토의 기록')).toBeInTheDocument();
    });
  });

  test('스터디 기록 페이지에서 스터디에서 진행한 사이클 횟수를 확인할 수 있다.', async () => {
    render(
      <MemoryRouter initialEntries={['/record/1']}>
        <ModalProvider>
          <MemberInfoProvider>
            <StudyRecord />
          </MemberInfoProvider>
        </ModalProvider>
      </MemoryRouter>,
    );

    await waitFor(() => {
      const button = screen.getAllByText('펼쳐보기')[0];
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(screen.getAllByTestId('tab').length).toBe(3);
    });
  });

  test('스터디 기록 페이지에서 스터디원의 기록을 확인할 수 있다.', async () => {
    render(
      <MemoryRouter initialEntries={['/record/1']}>
        <ModalProvider>
          <MemberInfoProvider>
            <StudyRecord />
          </MemberInfoProvider>
        </ModalProvider>
      </MemoryRouter>,
    );

    await waitFor(() => {
      const button = screen.getAllByText('펼쳐보기')[0];
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(screen.getByText('모던 자바스크립트 15장 정독(let, const 키워드와 블록 레벨 스코프)')).toBeInTheDocument();
    });
  });
});
