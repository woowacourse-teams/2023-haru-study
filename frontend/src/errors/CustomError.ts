export class ExpiredAccessTokenError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'ExpriedAccessTokenError';
    this.statusCode = statusCode;
  }
}

export class NotExistProgressesError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'NotExistProgressesError';
    this.statusCode = statusCode;
  }
}
