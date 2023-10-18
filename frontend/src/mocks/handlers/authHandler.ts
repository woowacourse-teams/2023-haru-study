/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw';

import { hasCookie } from '@Utils/cookie';

import { API_BASIC_URL } from '@Apis/index';

import { ACCESS_TOKEN, NEW_ACCESS_TOKEN, USER_DATA } from '../mockData';

export const authHandler = [
  // 로그아웃 API
  rest.post(`${API_BASIC_URL}/auth/logout`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  // 게스트 로그인 API
  rest.post(`${API_BASIC_URL}/auth/guest`, (req, res, ctx) => {
    return res(
      ctx.delay(2000),
      ctx.json({
        accessToken: ACCESS_TOKEN,
      }),
    );
  }),

  // 소셜 로그인 API
  rest.post(`${API_BASIC_URL}/auth/login`, (req, res, ctx) => {
    return res(
      ctx.delay(2000),
      ctx.json({
        accessToken: ACCESS_TOKEN,
      }),
      ctx.cookie('refreshToken', Date.now().toString()),
    );
  }),

  // 토큰 갱신 API
  rest.post(`${API_BASIC_URL}/auth/refresh`, (req, res, ctx) => {
    const hasRefreshToken = hasCookie('refreshToken');

    if (!hasRefreshToken) {
      return res(
        ctx.status(401),
        ctx.delay(100),
        ctx.json({
          message: '토큰이 없습니다.',
          code: 1405,
        }),
      );
    }

    return res(
      ctx.delay(300),
      ctx.json({
        accessToken: NEW_ACCESS_TOKEN,
      }),
      ctx.cookie('refreshToken', Date.now().toString()),
    );
  }),

  // 멤버 프로필 정보 조회 API
  rest.get(`${API_BASIC_URL}/me`, (req, res, ctx) => {
    const requestAuthToken = req.headers.get('Authorization')?.split(' ')[1];

    if (requestAuthToken === NEW_ACCESS_TOKEN) return res(ctx.status(200), ctx.json(USER_DATA), ctx.delay(400));

    if (ACCESS_TOKEN !== requestAuthToken)
      return res(
        ctx.status(401),
        ctx.delay(100),
        ctx.json({
          message: '만료된 갱신 토큰입니다.',
          code: 1403,
        }),
      );

    return res(ctx.delay(1000), ctx.json(USER_DATA));
  }),
];
