import { rest } from 'msw';

export const createStudyHandlers = [
  rest.post('/api/studies', (req, res, ctx) => {
    const accessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjkxNTY4NDI4LCJleHAiOjE2OTE1NzIwMjh9.BfGH7jBxO_iixmlpzxHKV7d9ekJPegLxrpY9ME066ro';

    const requestAuthToken = req.headers.get('Authorization')?.split(' ')[1];

    const newAccessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaWF0IjoxMjM0NTY3fQ.NUiutjXo0mcIBU5fWxfjpBEvPxakFiBaUCg4THKAYpQ';

    if (requestAuthToken === newAccessToken)
      return res(
        // 성공
        ctx.status(201),
        ctx.set({ 'Content-Type': 'application/json', Location: '/api/v2/studies/1' }),
        ctx.json({
          participantCode: '123456',
        }),

        // 에러
        // ctx.status(404),
        // ctx.json({
        //   code: 1201,
        //   message: '에러',
        // }),

        ctx.delay(1000),
      );

    if (accessToken !== requestAuthToken)
      return res(
        ctx.status(401),
        ctx.json({ message: '유효하지 않은 엑세스 토큰입니다.', code: 1403 }),
        ctx.delay(1000),
      );

    return res(
      // 성공
      ctx.status(201),
      ctx.set({ 'Content-Type': 'application/json', Location: '/api/v2/studies/1' }),
      ctx.json({
        participantCode: '123456',
      }),

      // 에러
      // ctx.status(404),
      // ctx.json({
      //   code: 1201,
      //   message: '에러',
      // }),

      ctx.delay(1000),
    );
  }),
];
