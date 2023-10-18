import { rest } from 'msw';

import { PARTICIPANTS_MOCK_DATA } from '../mockData';

export const participantsHandler = [
  rest.get('/admin/participants', (req, res, ctx) => {
    const query = req.url.searchParams;
    const page = Number(query.get('page') || 0);
    const size = Number(query.get('size') || 10);

    const totalItems = PARTICIPANTS_MOCK_DATA.length;
    const totalPage = Math.ceil(totalItems / size);

    const startIndex = page * size;
    const endIndex = startIndex + size;

    const data = PARTICIPANTS_MOCK_DATA.slice(startIndex, endIndex);

    return res(ctx.status(200), ctx.json({ totalPage, data }));
  }),
];
