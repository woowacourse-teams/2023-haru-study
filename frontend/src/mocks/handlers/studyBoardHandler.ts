import { rest } from 'msw';

import type { Plan, Retrospect, StudyData } from '@Types/study';

let studyData: StudyData = {
  studyName: '안오면 지상렬',
  totalCycle: 3,
  currentCycle: 1,
  timePerCycle: 30,
  step: 'planning',
};

let plan: Plan = {
  toDo: '',
  completionCondition: '',
  expectedProbability: '',
  expectedDifficulty: '',
  whatCanYouDo: '',
};

export const studyBoardHandlers = [
  rest.get('/api/studies/:studyId/members/:memberId/metadata', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(studyData), ctx.delay(1200));
  }),

  rest.post<Plan>('/api/studies/:studyId/members/:memberId/content/plans', async (req, res, ctx) => {
    plan = await req.json();
    studyData = {
      ...studyData,
      step: 'studying',
    };

    return res(ctx.status(200), ctx.delay(1500));
  }),

  rest.post('/api/studies/:studyId/members/:memberId/next-step', async (req, res, ctx) => {
    studyData = {
      ...studyData,
      currentCycle: studyData.currentCycle + 1,
      step: 'retrospect',
    };
    return res(ctx.status(200), ctx.delay(1500));
  }),

  rest.post<Retrospect>('/api/studies/:studyId/members/:memberId/content/retrostpects', async (req, res, ctx) => {
    studyData = {
      ...studyData,
      step: 'planning',
    };

    return res(ctx.status(200), ctx.delay(1500));
  }),

  rest.get('/api/studies/:studyId/members/:memberId/content/plans', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(plan), ctx.delay(1200));
  }),
];
