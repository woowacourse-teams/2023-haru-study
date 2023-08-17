import { rest } from 'msw';

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjkxNTY4NDI4LCJleHAiOjE2OTE1NzIwMjh9.BfGH7jBxO_iixmlpzxHKV7d9ekJPegLxrpY9ME066ro';

export const authHandler = [
  rest.post('/api/auth/guest', (req, res, ctx) => {
    return res(
      ctx.delay(2000),
      ctx.json({
        accessToken,
      }),
    );
  }),

  rest.post('/api/auth/login', (req, res, ctx) => {
    return res(
      ctx.delay(2000),
      ctx.json({
        accessToken,
      }),
      ctx.cookie('refreshToken', Date.now().toString()),
    );
  }),

  rest.get('/api/members/:memberId', (req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.json({
        memberId: '1',
        name: '맘모스',
        email: 'haru12@gmail.com',
        imageUrl: 'https://lh3.google.com/u/0/ogw/AGvuzYZKngVdZecWrpGTnHj7hQRtO5p9tjelI5lvCcsk=s64-c-mo',
        loginType: 'google',
      }),
    );
  }),

  rest.post('/api/auth/refresh', (req, res, ctx) => {
    const newAccessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaWF0IjoxMjM0NTY3fQ.NUiutjXo0mcIBU5fWxfjpBEvPxakFiBaUCg4THKAYpQ';

    return res(
      ctx.delay(300),
      ctx.json({
        accessToken: newAccessToken,
      }),
      ctx.cookie('refreshToken', Date.now().toString()),
    );
  }),
];
