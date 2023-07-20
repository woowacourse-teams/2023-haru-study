import { rest } from 'msw';

export const studyMakingHandlers = [
  rest.post('/api/studies', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        participantCode: '123456',
      }),
    );
  }),
];
