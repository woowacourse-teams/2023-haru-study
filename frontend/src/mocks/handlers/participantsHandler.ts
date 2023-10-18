/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw';

import { API_BASIC_URL } from '@Apis/index';

import { ACCESS_TOKEN, NEW_ACCESS_TOKEN, STUDY_PARTICIPANT, STUDY_PARTICIPANT_LIST } from '../mockData';

export const participantsHandler = [
  // 참여자 조회 API
  rest.get(`${API_BASIC_URL}/studies/:studyId/participants`, (req, res, ctx) => {
    const memberId = req.url.searchParams.get('memberId');

    if (memberId) {
      return res(ctx.status(200), ctx.json({ participants: [STUDY_PARTICIPANT] }), ctx.delay(1000));
    }

    return res(ctx.status(200), ctx.json({ participants: STUDY_PARTICIPANT_LIST }), ctx.delay(1000));
  }),

  // 단일 참여자 조회 API
  rest.get(`${API_BASIC_URL}/studies/:studyId/participants/:participantId`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(STUDY_PARTICIPANT), ctx.delay(1000));
  }),

  // 참여자 조회(임시) API
  // 참여 코드 입력 후 이어하기 여부 확인을 위한 API
  rest.get(`${API_BASIC_URL}/temp/studies/:studyId/participants`, (req, res, ctx) => {
    const requestAuthToken = req.headers.get('Authorization')?.split(' ')[1];
    const memberId = req.url.searchParams.get('memberId');

    if (requestAuthToken === NEW_ACCESS_TOKEN && memberId !== '1')
      return res(
        ctx.status(404),
        ctx.json({
          message: '해당하는 멤버가 없습니다.',
          code: 1002,
        }),
        ctx.delay(1000),
      );

    if (requestAuthToken !== ACCESS_TOKEN)
      return res(
        ctx.status(401),
        ctx.json({ message: '유효하지 않은 엑세스 토큰입니다.', code: 1403 }),
        ctx.delay(1000),
      );

    if (requestAuthToken === ACCESS_TOKEN && memberId !== '1') {
      return res(
        ctx.status(404),
        ctx.json({
          message: '해당하는 멤버가 없습니다.',
          code: 1002,
        }),
        ctx.delay(1000),
      );
    }

    // 이전 기록이 있는 경우
    // return res(
    //   ctx.status(200),
    //   ctx.json({ participants: [{ participantId: 1, nickname: '하루', isHost: false }] }),
    //   ctx.delay(1000),
    // );

    // 이전 기록이 없는 경우
    return res(ctx.status(200), ctx.json({ participants: null }), ctx.delay(1000));
  }),

  // 스터디 참여 API
  rest.post(`${API_BASIC_URL}/studies/:studyId/participants`, (req, res, ctx) => {
    const requestAuthToken = req.headers.get('Authorization')?.split(' ')[1];

    if (requestAuthToken === NEW_ACCESS_TOKEN) {
      return res(ctx.status(201), ctx.delay(1000));
    }

    if (requestAuthToken !== ACCESS_TOKEN) {
      return res(ctx.status(401), ctx.delay(1000));
    }

    return res(ctx.status(201), ctx.delay(1000));
  }),

  // 스터디 참여자 삭제 API
  rest.delete(`${API_BASIC_URL}/studies/:studyId/participants/:progressId`, (req, res, ctx) => {
    return res(ctx.status(204));
  }),

  // 스터디 참여 코드 조회 API
  rest.get(`${API_BASIC_URL}/participant-codes`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        participantCode: '123456',
      }),
      ctx.delay(1000),
    );
  }),
];
