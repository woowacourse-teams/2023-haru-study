import { rest } from 'msw';

import { STUDIES_CREATED_MOCK_DATA, STUDIES_DETAIL_MOCK_DATA, STUDIES_DONE_MOCK_DATA, STUDIES_MOCK_DATA } from '../mockData';

export const studiesHandler = [
  rest.get('/admin/studies', (req, res, ctx) => {
    const query = req.url.searchParams;
    const page = Number(query.get('page') || 0);
    const size = Number(query.get('size') || 10);

    const totalItems = STUDIES_MOCK_DATA.length;
    const totalPage = Math.ceil(totalItems / size);

    const startIndex = page * size;
    const endIndex = startIndex + size;

    const data = STUDIES_MOCK_DATA.slice(startIndex, endIndex);

    return res(ctx.status(200), ctx.json({ totalPage, data }));
  }),

  rest.get('/admin/studies/:studyId/contents', (req, res, ctx) => {
    const query = req.url.searchParams;
    const page = Number(query.get('page') || 0);
    const size = Number(query.get('size') || 10);

    const totalItems = STUDIES_DETAIL_MOCK_DATA.contents.length;
    const totalPage = Math.ceil(totalItems / size);

    const startIndex = page * size;
    const endIndex = startIndex + size;

    const data = STUDIES_DETAIL_MOCK_DATA.contents.slice(startIndex, endIndex);

    return res(ctx.status(200), ctx.json({ ...STUDIES_DETAIL_MOCK_DATA, totalPage, contents: data }));
  }),

  rest.get('/admin/studies/done', (req, res, ctx) => {
    const query = req.url.searchParams;
    const page = Number(query.get('page') || 0);
    const size = Number(query.get('size') || 10);

    const totalItems = STUDIES_DONE_MOCK_DATA.length;
    const totalPage = Math.ceil(totalItems / size);

    const startIndex = page * size;
    const endIndex = startIndex + size;

    const data = STUDIES_DONE_MOCK_DATA.slice(startIndex, endIndex);

    return res(ctx.status(200), ctx.json({ totalPage, data }));
  }),

  rest.get('/admin/studies/created', (req, res, ctx) => {
    const query = req.url.searchParams;
    const page = Number(query.get('page') || 0);
    const size = Number(query.get('size') || 10);

    const totalItems = STUDIES_CREATED_MOCK_DATA.length;
    const totalPage = Math.ceil(totalItems / size);

    const startIndex = page * size;
    const endIndex = startIndex + size;

    const data = STUDIES_CREATED_MOCK_DATA.slice(startIndex, endIndex);

    return res(ctx.status(200), ctx.json({ totalPage, data }));
  }),
];
