import { TResult } from "../result/result";

export type HttpResponse = TResult;
export type HttpRequest<T = unknown> = {
  body?: T;
  query?: T;
  params?: T;
  headers?: T;
};

export const ok = <T>(data: T): HttpResponse => ({
  data,
  code: 200,
  success: true,
});

export const resultOk = <T>(data: T): TResult<T> => ({
  data,
  code: 200,
  success: true,
});
