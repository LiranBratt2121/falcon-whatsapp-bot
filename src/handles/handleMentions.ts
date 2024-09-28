import { GroupParticipant, Message } from "whatsapp-web.js";
import { replyMessage } from "../utils/send";

export const handleMentionEveryone = async (message: Message) => {
    const chat = await message.getChat();

    let text = '';
    let mentions: Array<string> = [];
    let participants: Array<GroupParticipant>;
    try {
        // @ts-ignore
        participants = chat.groupMetadata.participants;

        const admins = participants.filter((participant: GroupParticipant) => participant.isAdmin);

        if (!isAdmin(message, admins)) {
            replyMessage(message, "Only admins can use this command!");
            return;
        }

    } catch (error) {
        replyMessage(message, (error instanceof TypeError)
            ? "You can't tag everyone in a private chat!"
            : "Error while tagging everyone");

        console.log("Error while tagging everyone " + error);
        return;
    }

    for (let participant of participants) {
        mentions.push(participant.id._serialized); // Returns <number>@<server>
        text += `@${participant.id.user} `;
    }

    // @ts-ignore
    await chat.sendMessage(text, { mentions });
} 

const isAdmin = (message: Message, listOfAdmins: Array<GroupParticipant>) => {
    // @ts-ignore
    return listOfAdmins.some((admin) => admin.id._serialized === message.id.participant)
}