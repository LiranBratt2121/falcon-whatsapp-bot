import { Client, Message } from "whatsapp-web.js";

export const sendMessage = (client: Client, chatId: string, content: string): void => {
    client.sendMessage(chatId, content);
}

export const replyMessage = (message: Message, content: string): void => {
    message.reply(content);
}

