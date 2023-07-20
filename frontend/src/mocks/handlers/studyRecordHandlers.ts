import { rest } from 'msw';

const STUDY_CONTENT = [
  {
    cycle: 1,
    plan: {
      toDo: '내 프로젝트에서 발생하는 자바스크립트 this 오류 해결하기',
      completionCondition: '내 프로젝트에서 발생하는 자바스크립트 this 오류 해결하기',
      expectedProbability: '내 프로젝트에서 발생하는 자바스크립트 this 오류 해결하기',
      expecetedDifficulty: '내 프로젝트에서 발생하는 자바스크립트 this 오류 해결하기',
      whatCanYouDo: '내 프로젝트에서 발생하는 자바스크립트 this 오류 해결하기',
    },
    retrospect: {
      doneAsExpected: '내 프로젝트에서 발생하는 자바스크립트 this 오류 해결하기',
      experiencedDifficulty: '내 프로젝트에서 발생하는 자바스크립트 this 오류 해결하기',
      lesson: '내 프로젝트에서 발생하는 자바스크립트 this 오류 해결하기',
    },
  },
  {
    cycle: 2,
    plan: {
      toDo: '내 프로젝트에서 발생하는 자바스크립트 this 오류 해결하기',
      completionCondition: '내 프로젝트에서 발생하는 자바스크립트 this 오류 해결하기',
      expectedProbability: '내 프로젝트에서 발생하는 자바스크립트 this 오류 해결하기',
      expecetedDifficulty: '내 프로젝트에서 발생하는 자바스크립트 this 오류 해결하기',
      whatCanYouDo: '내 프로젝트에서 발생하는 자바스크립트 this 오류 해결하기',
    },
    retrospect: {
      doneAsExpected: '내 프로젝트에서 발생하는 자바스크립트 this 오류 해결하기',
      experiencedDifficulty: '내 프로젝트에서 발생하는 자바스크립트 this 오류 해결하기',
      lesson: '내 프로젝트에서 발생하는 자바스크립트 this 오류 해결하기',
    },
  },
  {
    cycle: 3,
    plan: {
      toDo: '내 프로젝트에서 발생하는 자바스크립트 this 오류 해결하기',
      completionCondition: '내 프로젝트에서 발생하는 자바스크립트 this 오류 해결하기',
      expectedProbability: '내 프로젝트에서 발생하는 자바스크립트 this 오류 해결하기',
      expecetedDifficulty: '내 프로젝트에서 발생하는 자바스크립트 this 오류 해결하기',
      whatCanYouDo: '내 프로젝트에서 발생하는 자바스크립트 this 오류 해결하기',
    },
    retrospect: {
      doneAsExpected: '내 프로젝트에서 발생하는 자바스크립트 this 오류 해결하기',
      experiencedDifficulty: '내 프로젝트에서 발생하는 자바스크립트 this 오류 해결하기',
      lesson: '내 프로젝트에서 발생하는 자바스크립트 this 오류 해결하기',
    },
  },
];

const STUDY_METADATA = {
  studyName: '안오면 지상렬',
  totalCycle: 3,
  timePerCycle: 25,
  members: [
    {
      memberId: 1,
      nickname: '노아',
    },
    {
      memberId: 2,
      nickname: '룩소',
    },
    {
      memberId: 3,
      nickname: '엽토',
    },
    {
      memberId: 4,
      nickname: '테오',
    },
    {
      memberId: 5,
      nickname: '모디',
    },
    {
      memberId: 6,
      nickname: '히이로',
    },
    {
      memberId: 7,
      nickname: '마코',
    },
  ],
};

export const studyRecordHandlers = [
  rest.get('/api/studies/:studyId/metadata', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(STUDY_METADATA), ctx.delay(500));
  }),

  rest.get('/api/studies/:studyId/members/:memberId/content', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(STUDY_CONTENT), ctx.delay(500));
  }),
];
