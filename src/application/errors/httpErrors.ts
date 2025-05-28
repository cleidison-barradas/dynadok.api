import { HttpResponse } from "../helpers/http";
import { TResult } from "../helpers/result";
import { ensureError } from "./ensureError";
import { HTTP_STATUS_CODE } from "./types";

export class AppServerError extends Error {
  public readonly code: number;

  constructor(
    message: string,
    code = HTTP_STATUS_CODE.STATUS_INTERNAL_SERVER_ERROR,
  ) {
    super(message);
    this.code = code;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends AppServerError {
  constructor(message: string) {
    super(message, HTTP_STATUS_CODE.STATUS_BAD_REQUEST);
  }
}

export class NotFoundError extends AppServerError {
  constructor(message: string) {
    super(message, HTTP_STATUS_CODE.STATUS_NOT_FOUND);
  }
}

export class InternalServerError extends AppServerError {
  constructor(message: string) {
    super(message, HTTP_STATUS_CODE.STATUS_INTERNAL_SERVER_ERROR);
  }
}

export class CommonInternalHttpErrorHandler {
  static handle(error: unknown): HttpResponse {
    const err = ensureError(error);

    const code =
      err instanceof AppServerError
        ? err.code
        : HTTP_STATUS_CODE.STATUS_INTERNAL_SERVER_ERROR;

    return {
      code,
      success: false,
      message: err.message,
      error: {
        code,
        success: false,
        message: err.message,
      },
    };
  }
}

export class CommonInternalErrorHandler {
  static handle<T>(error: unknown): TResult<T> {
    const err = ensureError(error);

    const code =
      err instanceof AppServerError
        ? err.code
        : HTTP_STATUS_CODE.STATUS_INTERNAL_SERVER_ERROR;

    return {
      code,
      success: false,
      message: err.message,
      error: {
        code,
        success: false,
        message: err.message,
      },
    };
  }
}
