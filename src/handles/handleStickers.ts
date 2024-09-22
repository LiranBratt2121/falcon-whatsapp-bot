import { Message, MessageMedia } from "whatsapp-web.js";
import { getQuotedMessage } from "../utils/quotes";
import { replyMessage } from "../utils/send";
import { stringToImageBase64 } from "../utils/stringToImageBase64";


export const handleCreateSticker = async (message: Message): Promise<void> => {
    const quotedMessage = await getQuotedMessage(message);

    if (!quotedMessage) {
        replyMessage(message, "Quote a message before using !sticker");
        return;
    }

    const isImg = quotedMessage.hasMedia;

    let media: MessageMedia;

    if (isImg) {
        media = await quotedMessage.downloadMedia();
    } else {
        const base64Image = stringToImageBase64(quotedMessage.body);
        const base64Data = base64Image.replace(/^data:image\/svg\+xml;base64,/, '');
        media = new MessageMedia("image/svg+xml", base64Data, "image.svg", base64Data.length);
    }

    console.log(media);  

    try {
        replyMessage(message, media, { sendMediaAsSticker: true });
    }catch(error) {
        console.log(error);
    }
};
