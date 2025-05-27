import { TResult } from "../result/result";

export type HttpResponse = TResult;
export type HttpRequest = {
  body?: unknown;
  query?: unknown;
  params?: unknown;
  headers?: unknown;
};
