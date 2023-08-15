import { ExpiredAccessTokenError } from '../errors/CustomError';

const http = {
  get: async <T>(url: string, config: RequestInit = {}) => {
    const response = await fetch(url, {
      ...config,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
    });

    if (response.status >= 200 && response.status < 300) {
      return response.json() as Promise<T>;
    }

    if (response.status === 401) throw new ExpiredAccessTokenError('토큰이 만료되었습니다.', response.status);

    throw new Error('에러가 발생했습니다.');
  },

  post: async (url: string, config: RequestInit = {}) => {
    const response = await fetch(url, {
      ...config,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
    });

    if (response.status >= 200 && response.status < 300) {
      return response;
    }

    if (response.status === 401) throw new ExpiredAccessTokenError('토큰이 만료되었습니다.', response.status);

    throw new Error('에러가 발생했습니다.');
  },
};

export default http;
