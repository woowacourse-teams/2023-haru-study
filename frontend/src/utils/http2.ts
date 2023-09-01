export type HttpResponse<T extends object> = {
  data: T;
  config: RequestInit;
  headers: Headers;
  ok: boolean;
  redirected: boolean;
  status: number;
  statusText: string;
  type: ResponseType;
  url: string;
};

type Interceptor = {
  onRequest: (config: RequestInit) => RequestInit;
  onResponse: <T extends object>(response: HttpResponse<T>) => HttpResponse<T> | PromiseLike<HttpResponse<T>>;
  onRequestError: (reason: unknown) => Promise<never>;
  onResponseError: (reason: unknown) => Promise<never>;
};

const processHttpResponse = async <T extends object>(response: Response, config: RequestInit) => {
  const data = (await response.json().catch(() => ({}))) as T;
  const { headers, ok, redirected, status, statusText, type, url } = response;
  return { data, config, headers, ok, redirected, status, statusText, type, url };
};

class Http {
  private baseURL;

  private defaultConfig: RequestInit;

  private interceptor: Interceptor;

  constructor(baseURL = '', defaultConfig: RequestInit = {}) {
    this.baseURL = baseURL;
    this.defaultConfig = defaultConfig;
    this.interceptor = {
      onRequest: (config) => config,
      onResponse: (response) => response,
      onRequestError: (reason) => Promise.reject(reason),
      onResponseError: (reason) => Promise.reject(reason),
    };
  }

  registerInterceptor(interceptor: Partial<Interceptor>) {
    this.interceptor = {
      ...this.interceptor,
      ...interceptor,
    };
  }

  request<T extends object = object>(url: string, config: RequestInit) {
    try {
      config = { ...this.defaultConfig, ...this.interceptor.onRequest(config) };

      return fetch(`${this.baseURL}${url}`, config)
        .then((response) => processHttpResponse<T>(response, config))
        .then(this.interceptor.onResponse)
        .catch(this.interceptor.onResponseError);
    } catch (reason) {
      return this.interceptor.onRequestError(reason);
    }
  }

  get<T extends object>(url: string, config: RequestInit = {}) {
    return this.request<T>(url, {
      ...config,
      method: 'GET',
    });
  }

  post<T extends object>(url: string, config: RequestInit = {}) {
    return this.request<T>(url, {
      ...config,
      method: 'POST',
    });
  }

  patch<T extends object>(url: string, config: RequestInit = {}) {
    return this.request<T>(url, {
      ...config,
      method: 'PATCH',
    });
  }

  put<T extends object>(url: string, config: RequestInit = {}) {
    return this.request<T>(url, {
      ...config,
      method: 'PUT',
    });
  }

  delete<T extends object>(url: string, config: RequestInit = {}) {
    return this.request<T>(url, {
      ...config,
      method: 'DELETE',
    });
  }
}

export default Http;
