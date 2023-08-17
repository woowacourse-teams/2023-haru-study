import { rest } from 'msw';

import type { MemberProgress, StudyBasicInfo } from '@Types/study';

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

const STUDY_MEMBERS: { progresses: MemberProgress[] } = {
  progresses: [
    {
      progressId: '1',
      nickname: '노아',
      currentCycle: 3,
      step: 'done',
    },
    {
      progressId: '2',
      nickname: '룩소',
      currentCycle: 2,
      step: 'planning',
    },
    {
      progressId: '3',
      nickname: '엽토',
      currentCycle: 3,
      step: 'retrospect',
    },
    {
      progressId: '4',
      nickname: '테오',
      currentCycle: 3,
      step: 'done',
    },
    {
      progressId: '5',
      nickname: '모디',
      currentCycle: 3,
      step: 'done',
    },
    {
      progressId: '6',
      nickname: '히이로',
      currentCycle: 3,
      step: 'done',
    },
    {
      progressId: '7',
      nickname: '마코',
      currentCycle: 3,
      step: 'done',
    },
    {
      progressId: '8',
      nickname: '도밥',
      currentCycle: 2,
      step: 'retrospect',
    },
    {
      progressId: '9',
      nickname: 'noah',
      currentCycle: 1,
      step: 'retrospect',
    },
  ],
};

const STUDY_METADATA = {
  studyName: '안오면 지상렬',
  totalCycle: 3,
  timePerCycle: 25,
  createdDateTime: '2023-08-15T06:25:39.093Z',
};

const STUDY_LIST: { studies: StudyBasicInfo[] } = {
  studies: [
    {
      studyId: '1',
      name: '안오면 지상렬',
      totalCycle: 3,
      timePerCycle: 60,
      createdDateTime: '2023-08-16T13:33:02.810Z',
    },
    {
      studyId: '2',
      name: '와도 지상렬',
      totalCycle: 6,
      timePerCycle: 30,
      createdDateTime: '2023-08-14T13:33:02.810Z',
    },
    {
      studyId: '3',
      name: '심야 공부방',
      totalCycle: 3,
      timePerCycle: 50,
      createdDateTime: '2023-08-12T13:33:02.810Z',
    },
    {
      studyId: '4',
      name: '짧고 빠른 공부방',
      totalCycle: 3,
      timePerCycle: 20,
      createdDateTime: '2023-08-11T13:33:02.810Z',
    },
  ],
};

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjkxNTY4NDI4LCJleHAiOjE2OTE1NzIwMjh9.BfGH7jBxO_iixmlpzxHKV7d9ekJPegLxrpY9ME066ro';

const newAccessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaWF0IjoxMjM0NTY3fQ.NUiutjXo0mcIBU5fWxfjpBEvPxakFiBaUCg4THKAYpQ';

export const studyRecordHandlers = [
  rest.get('/api/studies/:studyId', (req, res, ctx) => {
    const requestAuthToken = req.headers.get('Authorization')?.split(' ')[1];

    if (requestAuthToken === newAccessToken) return res(ctx.status(200), ctx.json(STUDY_METADATA), ctx.delay(400));

    if (accessToken !== requestAuthToken)
      return res(
        ctx.status(401),
        ctx.delay(100),
        ctx.json({
          message: '만료된 갱신 토큰입니다.',
          code: '1403',
        }),
      );

    return res(ctx.status(200), ctx.json(STUDY_METADATA), ctx.delay(400));
  }),

  rest.get('/api/studies/1/progresses', (req, res, ctx) => {
    const requestAuthToken = req.headers.get('Authorization')?.split(' ')[1];

    if (requestAuthToken === newAccessToken) return res(ctx.status(200), ctx.json(STUDY_MEMBERS), ctx.delay(400));

    if (accessToken !== requestAuthToken)
      return res(
        ctx.status(401),
        ctx.delay(100),
        ctx.json({
          message: '만료된 갱신 토큰입니다.',
          code: '1403',
        }),
      );

    return res(ctx.status(200), ctx.json(STUDY_MEMBERS), ctx.delay(400));
  }),

  rest.get('/api/studies/:studyId/contents?progressId=1', (req, res, ctx) => {
    const requestAuthToken = req.headers.get('Authorization')?.split(' ')[1];

    if (requestAuthToken === newAccessToken) return res(ctx.status(200), ctx.json(STUDY_CONTENT), ctx.delay(400));

    if (accessToken !== requestAuthToken)
      return res(
        ctx.status(401),
        ctx.delay(100),
        ctx.json({
          message: '만료된 갱신 토큰입니다.',
          code: '1403',
        }),
      );

    return res(ctx.status(200), ctx.json(STUDY_CONTENT), ctx.delay(400));
  }),

  rest.get('/api/studies?memberId=1', (req, res, ctx) => {
    const requestAuthToken = req.headers.get('Authorization')?.split(' ')[1];

    if (requestAuthToken === newAccessToken) return res(ctx.status(200), ctx.json(STUDY_LIST), ctx.delay(400));

    if (accessToken !== requestAuthToken)
      return res(
        ctx.status(401),
        ctx.delay(100),
        ctx.json({
          message: '만료된 갱신 토큰입니다.',
          code: '1403',
        }),
      );

    return res(ctx.status(200), ctx.json(STUDY_LIST), ctx.delay(400));
  }),
];
