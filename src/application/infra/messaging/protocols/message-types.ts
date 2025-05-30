export type SendMessageInput = {
  topic: string;
  message: string;
};

export type ConsumerInput = {
  consumers: Consumer[];
};

export type Consumer = Pick<SendMessageInput, "topic"> & {
  callback: (message: string) => Promise<void>;
};
