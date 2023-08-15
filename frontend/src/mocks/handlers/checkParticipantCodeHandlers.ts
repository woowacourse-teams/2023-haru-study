import { rest } from 'msw';

export const checkParticipantCodeHandlers = [
  rest.get('api/v2/studies', async (req, res, ctx) => {
    const accessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjkxNTY4NDI4LCJleHAiOjE2OTE1NzIwMjh9.BfGH7jBxO_iixmlpzxHKV7d9ekJPegLxrpY9ME066ro';
    const requestAuthToken = req.headers.get('Authorization')?.split(' ')[1];
    const newAccessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaWF0IjoxMjM0NTY3fQ.NUiutjXo0mcIBU5fWxfjpBEvPxakFiBaUCg4THKAYpQ';

    const testParticipantCode = '123456';
    const participantCode = req.url.searchParams.get('participantCode');

    if (requestAuthToken === newAccessToken && testParticipantCode === participantCode)
      return res(
        ctx.status(200),
        ctx.json({
          studies: [
            {
              studyId: 1,
              name: '안오면 지상렬',
              totalCycle: 2,
              timePerCycle: 20,
              createdDateTime: Date.now.toString(),
            },
          ],
        }),
        ctx.delay(1000),
      );

    if (requestAuthToken === newAccessToken && testParticipantCode !== participantCode) return res(ctx.status(404));

    if (accessToken !== requestAuthToken) return res(ctx.status(401), ctx.delay(1000));

    if (accessToken === requestAuthToken && testParticipantCode !== participantCode) return res(ctx.status(404));

    return res(
      ctx.status(200),
      ctx.json({
        studies: [
          {
            studyId: 1,
            name: '안오면 지상렬',
            totalCycle: 2,
            timePerCycle: 20,
            createdDateTime: Date.now.toString(),
          },
        ],
      }),
      ctx.delay(1000),
    );
  }),
];
