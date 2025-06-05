export class HttpException extends Error {
  public readonly statusCode: number;
  public readonly message: string;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestException extends HttpException {
  constructor(message = 'Bad Request') {
    super(message, 400);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

export class ForbiddenException extends HttpException {
  constructor(message = 'Forbidden') {
    super(message, 403);
  }
}

export class NotFoundException extends HttpException {
  constructor(message = 'Not Found') {
    super(message, 404);
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(message = 'Internal Server Error') {
    super(message, 500);
  }
}
