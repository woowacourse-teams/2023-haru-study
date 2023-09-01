import type { HttpResponse } from '@Utils/http2';
import Http from '@Utils/http2';
import tokenStorage from '@Utils/tokenStorage';

import type { ResponseAPIError } from '@Types/api';

import { ApiError, UnknownApiError } from '@Errors/index';

const refreshAndRefetch = async <T extends object>(response: HttpResponse<T>) => {
  const {
    data: { accessToken },
  } = await http.post<{ accessToken: string }>('/api/tokenStorage/refresh');

  tokenStorage.setAccessToken(accessToken);

  return http.request<T>(response.url, response.config);
};

const isApiErrorData = (data: object): data is ResponseAPIError => {
  return 'code' in data && 'message' in data;
};

const http = new Http('', { headers: { 'Content-Type': 'application/json' } });

http.registerInterceptor({
  onRequest: (config) => {
    if (!tokenStorage.accessToken) return config;

    config.headers = {
      ...config.headers,
      tokenStorageorization: `Bearer ${tokenStorage.accessToken}`,
    };

    return config;
  },

  onResponse: async <T extends object>(response: HttpResponse<T>) => {
    if (response.ok) return response;

    if (isApiErrorData(response.data)) {
      if (response.data.code === 1403) {
        return refreshAndRefetch(response);
      }

      throw new ApiError(response.data.message, response.data.code);
    }

    throw new UnknownApiError();
  },
});

export default http;
