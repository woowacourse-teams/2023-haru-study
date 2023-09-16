export class ApiError extends Error {
  code: number;

  config: RequestInit;

  constructor(message: string, code: number, config: RequestInit) {
    super(message);
    this.name = 'API Error';
    this.code = code;
    this.config = config;
  }
}

export class UnknownApiError extends Error {
  config: RequestInit;

  constructor(config: RequestInit) {
    super('서버 요청에 문제가 발생했습니다. 잠시 후에 다시 시도해주세요.');
    this.name = 'Unknown API Error';
    this.config = config;
  }
}
