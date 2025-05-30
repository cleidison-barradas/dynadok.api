type QueueConfig = {
  url: string;
};

export const queueConfig: QueueConfig = {
  url: process.env.RABBITMQ_URL,
};
