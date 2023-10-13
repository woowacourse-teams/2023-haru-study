/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw';

import type { Step } from '@Types/study';

import { ACCESS_TOKEN, NEW_ACCESS_TOKEN, STUDY_INFO } from '../mockData';

export const studiesHandler = [
  // 필터링 조건으로 스터디 조회 API
  rest.get('/api/studies', (req, res, ctx) => {
    const requestAuthToken = req.headers.get('Authorization')?.split(' ')[1];

    const testParticipantCode = '123456';
    const participantCode = req.url.searchParams.get('participantCode');

    const isAuthorized = [ACCESS_TOKEN, NEW_ACCESS_TOKEN].includes(requestAuthToken || '');

    if (!isAuthorized) {
      return res(
        ctx.status(401),
        ctx.json({ message: '유효하지 않은 엑세스 토큰입니다.', code: 1403 }),
        ctx.delay(1000),
      );
    }

    if (testParticipantCode !== participantCode)
      return res(
        ctx.status(404),
        ctx.json({
          message: '해당하는 참여코드가 없습니다.',
          code: 1300,
        }),
      );

    return res(
      ctx.status(200),
      ctx.json({
        studies: [STUDY_INFO],
      }),
      ctx.delay(1000),
    );
  }),

  // 스터디 생성 API
  rest.post('/api/studies', (req, res, ctx) => {
    const requestAuthToken = req.headers.get('Authorization')?.split(' ')[1];

    const isAuthorized = [ACCESS_TOKEN, NEW_ACCESS_TOKEN].includes(requestAuthToken || '');

    if (!isAuthorized) {
      return res(
        ctx.status(401),
        ctx.json({ message: '유효하지 않은 엑세스 토큰입니다.', code: 1403 }),
        ctx.delay(1000),
      );
    }

    return res(
      ctx.status(201),
      ctx.set({ 'Content-Type': 'application/json', Location: '/api/studies/1' }),
      ctx.delay(1000),
    );
  }),

  // 다음 스터디 단계로 이동 API
  rest.post('/api/studies/:studyId/next-step', (req, res, ctx) => {
    const getNextStep = (): Step => {
      if (STUDY_INFO.progressStep === 'planning') return 'studying';
      if (STUDY_INFO.progressStep === 'studying') return 'retrospect';
      return 'planning';
    };

    if (STUDY_INFO.progressStep === 'retrospect') {
      STUDY_INFO.currentCycle += 1;
    }

    STUDY_INFO.progressStep = getNextStep();
    STUDY_INFO.lastModifiedDate = new Date().toISOString();

    return res(ctx.status(200), ctx.delay(600));
  }),

  // 단일 스터디 정보 조회 API
  rest.get('/api/studies/:studyId', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(STUDY_INFO), ctx.delay(1000));
  }),
];
