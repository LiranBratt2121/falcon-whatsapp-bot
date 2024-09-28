import { Client, Message, MessageContent, MessageMedia, MessageSendOptions } from "whatsapp-web.js";
import { ImageTypes, TimeConvention } from "./types";

export const sendMessage = (client: Client, chatId: string, content: string, options?: MessageSendOptions): void => {
    client.sendMessage(chatId, content, options);
}

export const replyMessage = (message: Message, content: string | MessageContent, options?: MessageSendOptions): void => {
    message.reply(content, message.from, options);
}

export const sendDelayedMessage = (convention: TimeConvention, time: number, client: Client, chatId: string, content: string, options?: MessageSendOptions) => {
    const waitTimeInMS = convention.valueOf() * time;

    setTimeout(() => sendMessage(client, chatId, content, options), waitTimeInMS);
}

export const sendDelyedReply = (convention: TimeConvention, time: number, message: Message, content: string | MessageContent, options?: MessageSendOptions): void => {
    const waitTimeInMS = convention * time;
    setTimeout(() => message.reply(content, message.from, options), waitTimeInMS);
}

export const sendDelyedReplyWithMsg = (convention: TimeConvention, time: number, message: Message, quotedMessage: Message, content: string | MessageContent, options?: MessageSendOptions): void => {
    const waitTimeInMS = convention * time;
    setTimeout(() => message.reply(content, message.from, options), waitTimeInMS);
}

export const sendPathAsSticker = (imagePath: string, type: ImageTypes, message: Message) => {
    const media = new MessageMedia(`image/${type}`, imagePath, `image.${type}`, imagePath.length);
    replyMessage(message, media, { sendMediaAsSticker: true });
}