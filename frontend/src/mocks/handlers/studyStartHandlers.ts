import { rest } from 'msw';

export const studyStartHandlers = [
  rest.post('/api/studies/:studyId/members', (req, res, ctx) => {
    const studyId = req.params.studyId[0];
    const regex = /[^0-9]/g;

    if (regex.test(studyId)) {
      return res(ctx.status(404));
    }

    return res(
      ctx.status(201),
      ctx.set({ 'Content-Type': 'application/json', Location: `/api/studies/${studyId}/members/5 ` }),
    );
  }),
];
