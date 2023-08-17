import type { ResponseAPIError } from '@Types/api';

import { APIError, OfflineError, ResponseError } from '@Errors/index';

const isAPIErrorData = (data: ResponseAPIError | undefined): data is ResponseAPIError => {
  return (data as ResponseAPIError).code !== undefined;
};

const fetchAPI = async (url: string, config: RequestInit) => {
  if (!navigator.onLine) throw new OfflineError();

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const data = (await response.json()) as ResponseAPIError | undefined;

      if (isAPIErrorData(data)) {
        throw new APIError(data.message, data.code);
      }

      throw new ResponseError('알수없는 에러입니다.');
    }

    return response;
  } catch (error) {
    if (error instanceof APIError) throw error;

    throw new ResponseError('알수없는 에러입니다.');
  }
};

const http = {
  get: async <T>(url: string, config: RequestInit = {}) => {
    const response = await fetchAPI(url, {
      ...config,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
    });

    return response.json() as T;
  },

  post: (url: string, config: RequestInit = {}) => {
    return fetchAPI(url, {
      ...config,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
    });
  },
};

export default http;
