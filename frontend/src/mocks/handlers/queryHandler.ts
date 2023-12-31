/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw';

import format from '@Utils/format';

import { API_BASE_URL } from '@Apis/httpInstance';

import {
  ACCESS_TOKEN,
  NEW_ACCESS_TOKEN,
  STUDY_LIST_10,
  STUDY_LIST_8,
  STUDY_LIST_9,
  STUDY_LIST_ALL,
  STUDY_LIST_EMPTY,
  STUDY_LIST_ONE_MONTH,
  STUDY_LIST_THREE_MONTH,
  STUDY_LIST_WEEK,
} from '../mockData';

export const queryHandler = [
  // 스터디 기록 페이지 조회 API
  rest.get(`${API_BASE_URL}/view/study-records`, (req, res, ctx) => {
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
      : startDate === format.date(new Date('2023-07-01'), '-')
      ? {
          studyRecords: STUDY_LIST_EMPTY.studyRecords,
          pageInfo: STUDY_LIST_EMPTY.pageInfo,
        }
      : {
          studyRecords: STUDY_LIST_WEEK.studyRecords.slice(20 * page, 20 * (page + 1)),
          pageInfo: STUDY_LIST_WEEK.pageInfo,
        };

    if (requestAuthToken === NEW_ACCESS_TOKEN) return res(ctx.status(200), ctx.json(studyList), ctx.delay(150));

    if (ACCESS_TOKEN !== requestAuthToken)
      return res(
        ctx.status(401),
        ctx.delay(100),
        ctx.json({
          message: '만료된 갱신 토큰입니다.',
          code: 1403,
        }),
      );

    return res(ctx.status(200), ctx.json(studyList), ctx.delay(150));
  }),

  // 달력 기반 스터디 기록 조회 API
  rest.get(`${API_BASE_URL}/view/calendar/study-records`, (req, res, ctx) => {
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

    setTimeout(() => {
      const addDate =
        startDate === '2023-07-30' ? '2023-08-18' : startDate === '2023-08-27' ? '2023-09-03' : '2023-10-10';

      studyList.studyRecords[addDate] = Array.from({ length: 2 }).map((_, index) => {
        return {
          studyId: String(index),
          name: `안오면 지상렬${index + 1} 8월`,
          totalCycle: Math.floor(Math.random() * 8) + 1,
          timePerCycle: (Math.floor(Math.random() * (12 - 1 + 1)) + 1) * 5,
          createdDate: '2023-08-16T13:33:02.810Z',
        };
      });
    }, 3000);

    if (requestAuthToken === NEW_ACCESS_TOKEN) return res(ctx.status(200), ctx.json(studyList), ctx.delay(150));

    if (ACCESS_TOKEN !== requestAuthToken)
      return res(
        ctx.status(401),
        ctx.delay(100),
        ctx.json({
          message: '만료된 갱신 토큰입니다.',
          code: 1403,
        }),
      );

    return res(ctx.status(200), ctx.json(studyList), ctx.delay(150));
  }),
];
