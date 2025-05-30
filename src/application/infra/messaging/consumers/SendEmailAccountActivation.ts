import { logger } from "@/application/lib";
import { Consumer } from "../protocols/message-types";
import { makeSetUserSendMailUseCase } from "@/application/factory/make/make-set-user-send-mail.usecase";

type MessagePayload = {
  _id: string;
  name: string;
  email: string;
  phone: string;
};

export const emailConsumer: Consumer = {
  topic: "sendEmailAccountActivation",
  callback: async (message: string) => {
    const parsedMessage = JSON.parse(message) as MessagePayload;

    if (!parsedMessage) {
      return;
    }

    const usecase = makeSetUserSendMailUseCase();
    await usecase.execute(parsedMessage._id, new Date());

    logger.info(`send email account activation to: ${parsedMessage?.email}`);
  },
};
