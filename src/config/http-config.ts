type HttpConfig = {
  port: number;
};

export const httpConfig: HttpConfig = {
  port: Number(process.env.HTTP_SERVER_PORT || 8000),
};
