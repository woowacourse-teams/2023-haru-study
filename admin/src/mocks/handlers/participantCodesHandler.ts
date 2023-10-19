import { rest } from 'msw';

import { PARTICIPANT_CODES_MOCK_DATA } from '../mockData';

export const participantCodesHandler = [
  rest.get('/api/admin/participant-codes', (req, res, ctx) => {
    const query = req.url.searchParams;
    const page = Number(query.get('page') || 0);
    const size = Number(query.get('size') || 10);

    const totalItems = PARTICIPANT_CODES_MOCK_DATA.length;
    const totalPage = Math.ceil(totalItems / size);

    const startIndex = page * size;
    const endIndex = startIndex + size;

    const data = PARTICIPANT_CODES_MOCK_DATA.slice(startIndex, endIndex);

    return res(ctx.status(200), ctx.json({ totalPage, data }));
  }),
];
