export class OfflineError extends Error {
  constructor(message?: string) {
    super(message || '인터넷 연결이 불안정 합니다. 네트워크 상태를 확인해주세요.');
    this.name = 'Offline Error';
  }
}

export class ApiError extends Error {
  code: number;

  constructor(message: string, code: number) {
    super(message);
    this.name = 'API Error';
    this.code = code;
  }
}

export class UnknownApiError extends Error {
  constructor() {
    super('서버 요청에 문제가 발생했습니다. 잠시 후에 다시 시도해주세요.');
    this.name = 'Unknown API Error';
  }
}
