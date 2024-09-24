import { Message } from "whatsapp-web.js";
import { replyMessage } from "../utils/send"

export const handleDefault = (message: Message): boolean => {
    const content = `Message not supported by the bot.`;
    if (message.body.startsWith('!')) {
        replyMessage(message, content);
        return true;
    }

    return false;
}

export const handlePing = (message: Message): void => {
    replyMessage(message, "pong");
}