import type { HttpResponse } from '@Utils/Http';
import Http from '@Utils/Http';
import tokenStorage from '@Utils/tokenStorage';

import type { ResponseAPIError } from '@Types/api';

import { ApiError, UnknownApiError } from '@Errors/index';

const http = new Http(process.env.REACT_APP_BASE_URL, { headers: { 'Content-Type': 'application/json' } });

const refreshAndRefetch = async <T extends object>(response: HttpResponse<T>) => {
  const {
    data: { accessToken },
  } = await http.post<{ accessToken: string }>('/api/auth/refresh');

  tokenStorage.setAccessToken(accessToken);

  return http.request<T>(response.url, response.config);
};

const isApiErrorData = (data: object): data is ResponseAPIError => {
  return 'code' in data && 'message' in data;
};

http.registerInterceptor({
  onRequest: (config) => {
    if (!tokenStorage.accessToken) return config;

    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${tokenStorage.accessToken}`,
    };

    return config;
  },

  onResponse: async <T extends object>(response: HttpResponse<T>) => {
    if (response.ok) return response;

    if (isApiErrorData(response.data)) {
      if (response.data.code === 1403 || response.data.code === 1404) {
        return refreshAndRefetch(response);
      }

      throw new ApiError(response.data.message, response.data.code, response.config);
    }

    throw new UnknownApiError(response.config);
  },
});

export default http;