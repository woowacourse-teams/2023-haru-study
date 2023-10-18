/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw';

import { API_BASIC_URL } from '@Apis/index';

import { STUDY_INFO, STUDY_PARTICIPANT_LIST } from '../mockData';

export const pollingHandler = [
  // 대기방 참여자 조회 API
  rest.get(`${API_BASIC_URL}/waiting`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        studyStep: 'waiting',
        participants: STUDY_PARTICIPANT_LIST,
      }),
      ctx.delay(500),
    );
  }),

  // 스터디원 별 제출 여부 조회 API
  rest.get(`${API_BASIC_URL}/submitted`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: [
          {
            nickname: '룩소',
            submitted: false,
          },
          {
            nickname: '노아',
            submitted: false,
          },
          {
            nickname: '엽토',
            submitted: true,
          },
        ],
      }),
      ctx.delay(500),
    );
  }),

  rest.get(`${API_BASIC_URL}/progress`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        progressStep: STUDY_INFO.progressStep,
      }),
      ctx.delay(500),
    );
  }),
];
