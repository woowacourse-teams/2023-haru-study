import { rest } from 'msw';

import { MOCK_LOGIN_DATA } from '../mockData';

export const loginHandler = [
  rest.post('admin/login', async (req, res, ctx) => {
    const contentType = req.headers.get('content-type');

    if (contentType === 'application/x-www-form-urlencoded') {
      const body = await req.text();
      const formData = new URLSearchParams(body);
      const account = formData.get('account');
      const password = formData.get('password');

      if (account === MOCK_LOGIN_DATA.account && password === MOCK_LOGIN_DATA.password) {
        return res(ctx.status(200));
      } else {
        return res(ctx.status(401));
      }
    } else {
      return res(ctx.status(400));
    }
  }),
];
