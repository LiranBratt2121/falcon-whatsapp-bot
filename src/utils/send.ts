import { Client, Message, MessageContent, MessageSendOptions } from "whatsapp-web.js";

export const sendMessage = (client: Client, chatId: string, content: string, options?: MessageSendOptions): void => {
    client.sendMessage(chatId, content, options);
}

export const replyMessage = (message: Message, content: string | MessageContent, options?: MessageSendOptions): void => {
    message.reply(content, message.from, options);
}

