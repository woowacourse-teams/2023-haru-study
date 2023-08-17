import { rest } from 'msw';

import type { PlanList, ProgressInfo, Step, StudyInfo } from '@Types/study';

type RequestWritePlan = {
  progressId: string;
  plan: PlanList;
};

const studyInfo: StudyInfo = {
  studyId: '1',
  name: '안오면 지상렬',
  totalCycle: 3,
  timePerCycle: 30,
  createdDateTime: '123',
};

let progress: ProgressInfo = {
  progressId: '1',
  nickname: '맘모스',
  currentCycle: 1,
  step: 'planning',
};

let planList: PlanList = {
  toDo: '',
  completionCondition: '',
  expectedProbability: '',
  expectedDifficulty: '',
  whatCanYouDo: '',
};

export const studyBoardHandlers = [
  rest.get('/api/studies/:studyId', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(studyInfo), ctx.delay(700));
  }),

  rest.get('/api/studies/:studyId/progresses', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ progresses: [{ ...progress }] }), ctx.delay(500));
  }),

  rest.post<RequestWritePlan>('/api/studies/:studyId/contents/write-plan', (req, res, ctx) => {
    const { plan } = req.body;
    planList = plan;

    return res(ctx.status(200), ctx.delay(600));
  }),

  rest.post('/api/studies/:studyId/progresses/:progressId/next-step', async (req, res, ctx) => {
    const getNextStep = (): Step => {
      if (progress.step === 'planning') return 'studying';
      if (progress.step === 'studying') return 'retrospect';
      return 'planning';
    };

    progress = {
      ...progress,
      currentCycle: progress.step === 'retrospect' ? progress.currentCycle + 1 : progress.currentCycle,
      step: getNextStep(),
    };
    return res(ctx.status(200), ctx.delay(600));
  }),

  rest.post('/api/studies/:studyId/contents/write-retrospect', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(600));
  }),

  rest.get('/api/studies/:studyId/contents', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        content: [
          {
            cycle: progress.currentCycle,
            plan: planList,
            retrospect: {},
          },
        ],
      }),
      ctx.delay(1200),
    );
  }),
];
