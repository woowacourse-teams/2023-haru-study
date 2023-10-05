/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw';

import type { PlanList, RetrospectList } from '@Types/study';

import { STUDY_CONTENT } from '../mockData';

type RequestWritePlan = {
  participantId: string;
  plan: PlanList;
};

type RequestWriteRetrospect = {
  participantId: string;
  retrospect: RetrospectList;
};

export const ContentsHandler = [
  // 스터디 계획 작성 API
  rest.post<RequestWritePlan>('/api/studies/:studyId/contents/write-plan', async (req, res, ctx) => {
    const { plan } = await req.json<RequestWritePlan>();

    STUDY_CONTENT[0].plan = plan;

    return res(ctx.status(200), ctx.delay(600));
  }),

  // 스터디 회고 작성 API
  rest.post<RequestWriteRetrospect>('/api/studies/:studyId/contents/write-retrospect', async (req, res, ctx) => {
    const { retrospect } = await req.json<RequestWriteRetrospect>();

    STUDY_CONTENT[0].retrospect = retrospect;

    return res(ctx.status(200), ctx.delay(600));
  }),

  // 멤버 컨텐츠 조회 API
  rest.get('/api/studies/:studyId/contents', (req, res, ctx) => {
    const cycle = Number(req.url.searchParams.get('cycle'));

    if (cycle) {
      return res(
        ctx.status(200),
        ctx.json({
          content: [
            {
              cycle: cycle,
              plan: STUDY_CONTENT[cycle - 1].plan,
              retrospect: STUDY_CONTENT[cycle - 1].retrospect,
            },
          ],
        }),
        ctx.delay(1200),
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        content: STUDY_CONTENT,
      }),
      ctx.delay(1200),
    );
  }),
];
