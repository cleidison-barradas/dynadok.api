import { queueConfig } from "@/config";
import { RabbitMQAdapter } from "../adapters";
import { ConsumerInput, SendMessageInput } from "../protocols/message-types";

export const makeBrokerAdapter = () => new RabbitMQAdapter(queueConfig.url);

export async function consumeQueueMessages(
  consumers: ConsumerInput["consumers"],
) {
  const rabbitMQAdapter = makeBrokerAdapter();

  await rabbitMQAdapter.connect();

  for (const consumer of consumers) {
    await rabbitMQAdapter.consumeMessages(consumer.topic, consumer.callback);
  }
}

export async function sendQueueMessage(messageInput: SendMessageInput) {
  const rabbitMQAdapter = makeBrokerAdapter();

  await rabbitMQAdapter.connect();

  await rabbitMQAdapter.sendMessage(messageInput.topic, messageInput.message);

  await rabbitMQAdapter.disconect();
}
