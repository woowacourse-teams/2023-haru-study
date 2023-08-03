const http = {
  get: async <T>(url: string) => {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('에러가 발생했습니다. 다시 시도해주세요.');
    }

    return response.json() as Promise<T>;
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

    if (!response.ok) {
      throw new Error('에러가 발생했습니다. 다시 시도해주세요.');
    }

    return response;
  },
};

export default http;
