import { Message } from "whatsapp-web.js";
import { replyMessage } from "../utils/send"

export const handleDefault = (message: Message): void => {
    const content = `Message not supported by the bot.`;
    if (message.body.startsWith('!')) {
        replyMessage(message, content);
    }
}

export const handlePing = (message: Message): void => {
    replyMessage(message, "pong");
}