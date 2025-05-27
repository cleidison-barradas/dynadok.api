type TResultError = {
  code: number;
  error: unknown;
  message: string;
  success: false;
};

type TResultSuccess = {
  code: number;
  data: unknown;
  success: true;
};

export type TResult = TResultError | TResultSuccess;
