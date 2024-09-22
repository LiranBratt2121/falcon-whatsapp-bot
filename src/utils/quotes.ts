import { Message } from "whatsapp-web.js";

export const getQuotedMessage = async (message: Message): Promise<Message | null> => {
    if (!message.hasQuotedMsg) {
        return null;
    }

    return await message.getQuotedMessage();
}