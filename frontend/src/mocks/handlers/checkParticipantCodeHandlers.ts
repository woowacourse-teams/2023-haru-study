import { rest } from 'msw';

type RequestData = {
  participantCode: string;
  memberId: number | null;
};

export const checkParticipantCodeHandlers = [
  rest.post(`api/studies/authenticate`, async (req, res, ctx) => {
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
        nickname: '엽토',
      }),
      ctx.delay(1000),
    );
  }),
];
