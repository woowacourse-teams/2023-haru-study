import { rest } from 'msw';

export const progressesHandlers = [
  rest.get('/api/v2/studies/:studyId/progresses', (req, res, ctx) => {
    const accessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjkxNTY4NDI4LCJleHAiOjE2OTE1NzIwMjh9.BfGH7jBxO_iixmlpzxHKV7d9ekJPegLxrpY9ME066ro';
    const requestAuthToken = req.headers.get('Authorization')?.split(' ')[1];
    const newAccessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaWF0IjoxMjM0NTY3fQ.NUiutjXo0mcIBU5fWxfjpBEvPxakFiBaUCg4THKAYpQ';

    const memberId = req.url.searchParams.get('memberId');

    if (requestAuthToken === newAccessToken && memberId === '1')
      return res(
        ctx.status(200),
        ctx.json({ progresses: [{ progressId: 1, nickname: '하루', currentCycle: 1, step: 'planning' }] }),
        ctx.delay(300),
      );

    if (requestAuthToken === newAccessToken && memberId !== '1')
      return res(
        ctx.status(404),
        ctx.json({
          message: '해당하는 멤버가 없습니다.',
          code: '1002',
        }),
        ctx.delay(300),
      );

    if (accessToken !== requestAuthToken)
      return res(
        ctx.status(401),
        ctx.json({ message: '유효하지 않은 엑세스 토큰입니다.', code: '1403' }),
        ctx.delay(300),
      );

    if (accessToken === requestAuthToken && memberId !== '1') {
      return res(
        ctx.status(404),
        ctx.json({
          message: '해당하는 멤버가 없습니다.',
          code: '1002',
        }),
        ctx.delay(300),
      );
    }

    return res(
      ctx.status(200),
      ctx.json({ progresses: [{ progressId: 1, nickname: '하루', currentCycle: 1, step: 'planning' }] }),
      ctx.delay(300),
    );
  }),
];
