/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw';

import format from '@Utils/format';

import {
  ACCESS_TOKEN,
  NEW_ACCESS_TOKEN,
  STUDY_LIST_10,
  STUDY_LIST_8,
  STUDY_LIST_9,
  STUDY_LIST_ALL,
  STUDY_LIST_ONE_MONTH,
  STUDY_LIST_THREE_MONTH,
  STUDY_LIST_WEEK,
} from '../mockData';

export const queryHandler = [
  // 스터디 기록 페이지 조회
  rest.get('/api/view/study-records', (req, res, ctx) => {
    const requestAuthToken = req.headers.get('Authorization')?.split(' ')[1];

    const searchParams: Record<string, string> = {};

    req.url.search
      .substring(1)
      .split('&')
      .map((item) => item.split('='))
      .forEach(([key, value]) => {
        searchParams[key] = value;
      });

    const page = Number(searchParams.page);

    const startDate = 'startDate' in searchParams ? searchParams.startDate : null;
    const today = new Date();
    const month = today.getMonth();

    const studyList = !startDate
      ? {
          studyRecords: STUDY_LIST_ALL.studyRecords.slice(20 * page, 20 * (page + 1)),
          pageInfo: STUDY_LIST_ALL.pageInfo,
        }
      : startDate === format.date(new Date(today.setMonth(month - 3)), '-')
      ? {
          studyRecords: STUDY_LIST_THREE_MONTH.studyRecords.slice(20 * page, 20 * (page + 1)),
          pageInfo: STUDY_LIST_THREE_MONTH.pageInfo,
        }
      : startDate === format.date(new Date(today.setMonth(month - 1)), '-')
      ? {
          studyRecords: STUDY_LIST_ONE_MONTH.studyRecords.slice(20 * page, 20 * (page + 1)),
          pageInfo: STUDY_LIST_ONE_MONTH.pageInfo,
        }
      : {
          studyRecords: STUDY_LIST_WEEK.studyRecords.slice(20 * page, 20 * (page + 1)),
          pageInfo: STUDY_LIST_WEEK.pageInfo,
        };

    if (requestAuthToken === NEW_ACCESS_TOKEN) return res(ctx.status(200), ctx.json(studyList), ctx.delay(1000));

    if (ACCESS_TOKEN !== requestAuthToken)
      return res(
        ctx.status(401),
        ctx.delay(100),
        ctx.json({
          message: '만료된 갱신 토큰입니다.',
          code: 1403,
        }),
      );

    return res(ctx.status(200), ctx.json(studyList), ctx.delay(1000));
  }),

  // 달력 기반 스터디 기록 조회
  rest.get('/api/view/calendar/study-records', (req, res, ctx) => {
    const requestAuthToken = req.headers.get('Authorization')?.split(' ')[1];

    const searchParams: Record<string, string> = {};

    req.url.search
      .substring(1)
      .split('&')
      .map((item) => item.split('='))
      .forEach(([key, value]) => {
        searchParams[key] = value;
      });

    const startDate = 'startDate' in searchParams ? searchParams.startDate : null;

    const studyList =
      startDate === '2023-07-30' ? STUDY_LIST_8 : startDate === '2023-08-27' ? STUDY_LIST_9 : STUDY_LIST_10;

    if (requestAuthToken === NEW_ACCESS_TOKEN) return res(ctx.status(200), ctx.json(studyList), ctx.delay(400));

    if (ACCESS_TOKEN !== requestAuthToken)
      return res(
        ctx.status(401),
        ctx.delay(100),
        ctx.json({
          message: '만료된 갱신 토큰입니다.',
          code: 1403,
        }),
      );

    return res(ctx.status(200), ctx.json(studyList), ctx.delay(400));
  }),
];
