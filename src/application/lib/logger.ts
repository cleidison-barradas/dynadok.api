import pino from "pino";

const logger = pino(
  pino.transport({
    targets: [
      {
        target: "pino-pretty",
        level: "info",

        options: {
          colorize: true,
          levelFirtst: true,
          translateTime: "dd-mm-yyyy HH:MM:ss",
          ignore: "pid,hostname",
        },
      },
    ],
  }),
);

const serializers = {
  req: (req) => {
    return {
      url: req.url,
      method: req.method,
    };
  },
  res: (res) => {
    return {
      statusCode: res.statusCode,
    };
  },
};

export { logger, serializers };
