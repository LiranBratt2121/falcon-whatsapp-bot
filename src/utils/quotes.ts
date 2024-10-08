import { Message } from "whatsapp-web.js";

export const getQuotedMessage = async (message: Message): Promise<Message | null> => {
    if (!message.hasQuotedMsg) {
        console.log("No quoted Message!");
        return null;
    }

    return await message.getQuotedMessage();
}