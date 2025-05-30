import amqp, { ChannelModel, Channel } from "amqplib";
import { BadRequestError } from "@/application/errors";
import { logger } from "@/application/lib";

export class RabbitMQAdapter {
  private connection: ChannelModel;
  private channel: Channel;
  constructor(private readonly url: string) {}

  async connect() {
    this.connection = await amqp.connect(this.url);
    this.channel = await this.connection.createChannel();
    logger.info("RabbitMQ connected");
  }

  async disconect() {
    if (this.channel && this.connection) {
      await this.channel.close();
      await this.connection.close();
    }
  }

  async sendMessage(topic: string, message: string) {
    if (!this.channel)
      throw new BadRequestError("RabbitMQ channel is not initialized");

    await this.channel.assertQueue(topic, { durable: true });

    this.channel.sendToQueue(topic, Buffer.from(message), {
      persistent: true,
    });
  }

  async consumeMessages(
    topic: string,
    callback: (message: string) => Promise<void>,
  ) {
    if (!this.channel) {
      throw new BadRequestError("RabbitMQ channel is not initialized");
    }

    await this.channel.assertQueue(topic, { durable: true });

    this.channel.consume(topic, async (msg) => {
      if (msg !== null) {
        await callback(msg.content.toString());
        this.channel.ack(msg);
      }
    });
  }
}
