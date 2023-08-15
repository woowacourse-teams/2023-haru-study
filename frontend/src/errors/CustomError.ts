export class ExpiredAccessTokenError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'ExpriedAccessTokenError';
    this.statusCode = statusCode;
  }
}
