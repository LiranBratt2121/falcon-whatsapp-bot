import { Message } from "whatsapp-web.js"
import { getQuotedMessage } from "../utils/quotes";
import { replyMessage, sendDelyedReply } from "../utils/send";
import { TimeContainer, TimeConvention } from "../utils/types";

export const handleNotifyMe = async (message: Message) => {
    let quotedMessage: Message | null;

    try {
        quotedMessage = await getQuotedMessage(message);
    } catch (error) {
        replyMessage(message, "Something happend ")
        console.log("Something happend " + error);
        return
    }

    if (!quotedMessage) {
        replyMessage(message, "Quote a message before using !notify-me <time> <minutes/seconds>");
        return;
    }

    const errorlogging = () => {
        replyMessage(message, "Error while processing the request. syntax: !notify-me <number> [seconds/minutes]");
        console.log("Error while processing the request. syntax: !notify-me <number> [seconds/minutes]");
    }

    const messageContent = message.body;
    let timeContainer: TimeContainer;
    
    if (messageContent.includes('seconds')) {
        timeContainer = {
            timeConvention: TimeConvention.SECS,
            timeTitle: 'seconds', 
            timeToWait: 0
        }

    } else if (messageContent.includes('minutes')) {
        timeContainer = {
            timeConvention: TimeConvention.MINS,
            timeTitle: 'minutes',
            timeToWait: 0
        }
    } else {
        errorlogging();
        return;
    }

    const timeToWait = messageContent.match(/\d+/)

    if (!timeToWait) {
        console.log("Time to wait ", timeToWait)
        errorlogging();
        return;
    }

    const parsedtimeToWait = parseInt(timeToWait[0])

    const contact = (await message.getContact()).id
    const serializedContact = contact._serialized;
    const fullTime = `${parsedtimeToWait} ${timeContainer.timeTitle}`

    replyMessage(message, `Notifying you in ${fullTime}`)
    sendDelyedReply(timeContainer.timeConvention, parsedtimeToWait, message, `@${contact.user} ${fullTime} is up`, { mentions: [serializedContact]})
}
