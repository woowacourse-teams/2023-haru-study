import { rest } from 'msw';

export const participantsHandlers = [
  rest.get('/api/temp/studies/:studyId/participants', (req, res, ctx) => {
    const accessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjkxNTY4NDI4LCJleHAiOjE2OTE1NzIwMjh9.BfGH7jBxO_iixmlpzxHKV7d9ekJPegLxrpY9ME066ro';
    const requestAuthToken = req.headers.get('Authorization')?.split(' ')[1];
    const newAccessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaWF0IjoxMjM0NTY3fQ.NUiutjXo0mcIBU5fWxfjpBEvPxakFiBaUCg4THKAYpQ';

    const memberId = req.url.searchParams.get('memberId');

    if (requestAuthToken === newAccessToken && memberId === '1')
      return res(
        // 성공
        // ctx.status(200),
        // ctx.json({ participants: [{ participantId: 1, nickname: '하루', isHost: false }] }),

        // participants가 없는 경우
        ctx.status(200),
        ctx.json({ participants: null }),

        // 그 외 에러
        // ctx.status(404),
        // ctx.json({ code: 1234, message: '에러' }),

        ctx.delay(1000),
      );

    if (requestAuthToken === newAccessToken && memberId !== '1')
      return res(
        ctx.status(404),
        ctx.json({
          message: '해당하는 멤버가 없습니다.',
          code: 1002,
        }),
        ctx.delay(1000),
      );

    if (accessToken !== requestAuthToken)
      return res(
        ctx.status(401),
        ctx.json({ message: '유효하지 않은 엑세스 토큰입니다.', code: 1403 }),
        ctx.delay(1000),
      );

    if (accessToken === requestAuthToken && memberId !== '1') {
      return res(
        ctx.status(404),
        ctx.json({
          message: '해당하는 멤버가 없습니다.',
          code: 1002,
        }),
        ctx.delay(1000),
      );
    }

    return res(
      // 성공
      // ctx.status(200),
      // ctx.json({ participants: [{ participantId: 1, nickname: '하루', isHost: false }] }),

      // participants가 없는 경우
      ctx.status(200),
      ctx.json({ participants: null }),

      // 그 외 에러
      // ctx.status(404),
      // ctx.json({ code: 1234, message: '에러' }),

      ctx.delay(1000),
    );
  }),

  rest.post('/api/studies/:studyId/progresses', (req, res, ctx) => {
    const accessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjkxNTY4NDI4LCJleHAiOjE2OTE1NzIwMjh9.BfGH7jBxO_iixmlpzxHKV7d9ekJPegLxrpY9ME066ro';
    const requestAuthToken = req.headers.get('Authorization')?.split(' ')[1];
    const newAccessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaWF0IjoxMjM0NTY3fQ.NUiutjXo0mcIBU5fWxfjpBEvPxakFiBaUCg4THKAYpQ';

    if (requestAuthToken === newAccessToken) {
      return res(
        // 성공
        ctx.status(201),

        // 실패
        // ctx.status(404),
        // ctx.json({ message: '에러', code: 1234 }),

        ctx.delay(1000),
      );
    }

    if (accessToken !== requestAuthToken) return res(ctx.status(401), ctx.delay(1000));

    return res(
      // 성공
      ctx.status(201),

      // 실패
      // ctx.status(404),
      // ctx.json({ message: '에러', code: 1234 }),

      ctx.delay(1000),
    );
  }),

  rest.delete('/api/studies/:studyId/participants/:progressId', (req, res, ctx) => {
    return res(ctx.status(204));
  }),
];
