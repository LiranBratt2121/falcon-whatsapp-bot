import { Message } from "whatsapp-web.js";
import { replyMessage } from "../utils/send";

export const handleMetionEveryone = async (message: Message) => {
    const chat = await message.getChat();

    let text = '';
    let mentions = [];
    let participants;
    try {
        // @ts-ignore
        participants = chat.groupMetadata.participants;
    }catch (error) {
        replyMessage(message, "Error while tagging everyone");
        console.log("Error while tagging everyone " + error);
        return;
    }

    for (let participant of participants) {
        mentions.push(participant.id._serialized); // Returns <number>@<server>
        text += `@${participant.id.user} `;
    }

    await chat.sendMessage(text, { mentions });
} 