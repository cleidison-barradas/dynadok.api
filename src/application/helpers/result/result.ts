import { AppServerError } from "src/application/errors";

type TResultError<E> = {
  code: number;
  error: unknown;
  message: string;
  success: false;
};

type TResultSuccess<T> = {
  code: number;
  data: T;
  success: true;
};

export type TResult<T = unknown, E extends AppServerError = AppServerError> =
  | TResultError<E>
  | TResultSuccess<T>;
