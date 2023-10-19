import { rest } from 'msw';

import { MEMBER_MOCK_DATA } from '../mockData';

export const memberHandler = [
  rest.get('/admin/members', (req, res, ctx) => {
    const query = req.url.searchParams;
    const page = Number(query.get('page') || 0);
    const size = Number(query.get('size') || 10);
    const loginType = query.get('loginType');

    const startIndex = page * size;
    const endIndex = startIndex + size;

    if (loginType && loginType === 'google') {
      const googleMembers = MEMBER_MOCK_DATA.filter((member) => member.loginType === 'google');

      const totalItems = googleMembers.length;
      const totalPage = Math.ceil(totalItems / size);

      const members = googleMembers.slice(startIndex, endIndex);

      return res(ctx.status(200), ctx.json({ totalPage, members }));
    }

    if (loginType && loginType === 'kakao') {
      const kakaoMembers = MEMBER_MOCK_DATA.filter((member) => member.loginType === 'kakao');

      const totalItems = kakaoMembers.length;
      const totalPage = Math.ceil(totalItems / size);

      const members = kakaoMembers.slice(startIndex, endIndex);

      return res(ctx.status(200), ctx.json({ totalPage, members }));
    }

    if (loginType && loginType === 'guest') {
      const guestMembers = MEMBER_MOCK_DATA.filter((member) => member.loginType === 'guest');

      const totalItems = guestMembers.length;
      const totalPage = Math.ceil(totalItems / size);

      const members = guestMembers.slice(startIndex, endIndex);

      return res(ctx.status(200), ctx.json({ totalPage, members }));
    }

    const totalItems = MEMBER_MOCK_DATA.length;
    const totalPage = Math.ceil(totalItems / size);

    const members = MEMBER_MOCK_DATA.slice(startIndex, endIndex);

    return res(ctx.status(200), ctx.json({ totalPage, members }));
  }),
];
