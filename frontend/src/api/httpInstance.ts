import { ROUTES_PATH } from '@Constants/routes';

import type { HttpResponse } from '@Utils/Http';
import Http from '@Utils/Http';
import tokenStorage from '@Utils/tokenStorage';
import url from '@Utils/url';

import type { ResponseAPIError } from '@Types/api';

import { ApiError, UnknownApiError } from '@Errors/index';

const API_PREFIX = '/api/v2';

export const API_BASE_URL = `${process.env.REACT_APP_BASE_URL || ''}${API_PREFIX}`;

const http = new Http(API_BASE_URL, { headers: { 'Content-Type': 'application/json' } });

const refreshAndRefetch = async <T extends object>(response: HttpResponse<T>) => {
  const {
    data: { accessToken },
  } = await http.post<{ accessToken: string }>('/auth/refresh');

  tokenStorage.setAccessToken(accessToken);

  return http.request<T>(response.url, response.config);
};

const logout = () => {
  tokenStorage.clear();
  if (url.getPathName() !== ROUTES_PATH.landing) {
    alert('토큰이 만료 되었습니다. 다시 로그인 해주세요.');
    url.changePathName(ROUTES_PATH.landing);
  }
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
      const errorCode = response.data.code;

      if (errorCode === 1403 || errorCode === 1404) {
        return refreshAndRefetch(response);
      }

      if (errorCode === 1402 || errorCode === 1405) {
        logout();
      }

      throw new ApiError(response.data.message, response.data.code, response.config);
    }

    throw new UnknownApiError(response.config);
  },
});

export default http;
