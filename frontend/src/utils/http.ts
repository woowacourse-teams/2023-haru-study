import type { ResponseAPIError } from '@Types/api';

import { APIError, OfflineError, ResponseError } from '@Errors/index';

const isAPIErrorData = (data: ResponseAPIError | undefined): data is ResponseAPIError => {
  return (data as ResponseAPIError).code !== undefined;
};

const http = {
  get: async <T>(url: string, config: RequestInit = {}) => {
    if (!navigator.onLine) throw new OfflineError();

    try {
      const response = await fetch(url, {
        ...config,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...config.headers,
        },
      });

      if (!response.ok) {
        const data = (await response.json()) as ResponseAPIError | undefined;

        if (isAPIErrorData(data)) {
          throw new APIError(data.message, data.code);
        }

        throw new ResponseError();
      }

      return response.json() as T;
    } catch (error) {
      if (error instanceof APIError) throw error;

      throw new ResponseError();
    }
  },

  post: async (url: string, config: RequestInit = {}) => {
    if (!navigator.onLine) throw new OfflineError();

    try {
      const response = await fetch(url, {
        ...config,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...config.headers,
        },
      });

      if (!response.ok) {
        const data = (await response.json()) as ResponseAPIError | undefined;

        if (isAPIErrorData(data)) {
          throw new APIError(data.message, data.code);
        }

        throw new ResponseError();
      }

      return response;
    } catch (error) {
      if (error instanceof APIError) throw error;
      throw new ResponseError();
    }
  },
};

export default http;
