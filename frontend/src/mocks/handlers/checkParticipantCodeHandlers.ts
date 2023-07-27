import { rest } from 'msw';

type RequestData = {
  participantCode: string;
  memberId: number | null;
};

export const checkParticipantCodeHandlers = [
  rest.post('api/studies/authenticate', async (req, res, ctx) => {
    const testParticipantCode = '123456';

    const { participantCode }: RequestData = await req.json();

    if (testParticipantCode !== participantCode) {
      return res(ctx.status(404));
    }

    return res(
      ctx.status(200),
      ctx.json({
        studyId: 1,
        studyName: '안오면 지상렬',
      }),
      ctx.delay(1000),
    );
  }),

  rest.get('/api/studies/:studyId/members/:memberId', (req, res, ctx) => {
    const memberId = req.params.memberId[0];

    if (memberId !== '5') {
      return res(ctx.status(404), ctx.delay(1000));
    }

    return res(ctx.status(200), ctx.json({ nickname: '하루' }), ctx.delay(300));
  }),
];
