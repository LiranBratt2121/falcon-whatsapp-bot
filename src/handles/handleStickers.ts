import Sticker, { StickerTypes } from "wa-sticker-formatter";
import { Client, Message, MessageMedia } from "whatsapp-web.js";
import { getQuotedMessage } from "../utils/quotes";
import { replyMessage } from "../utils/send";

const createSticker = (image: string): Sticker => {
    return new Sticker(image)
        .setPack("BOT")
        .setAuthor("BOT")
        .setType(StickerTypes.FULL)
        .setCategories(['😀'])
        .setID('1943')
        .setBackground('#000000')
        .setQuality(50)
}

export const handleCreateSticker = async (message: Message): Promise<void> => {
    const quotedMessage = await getQuotedMessage(message);

    if (!quotedMessage) {
        replyMessage(message, "Quote a message before using !sticker");
        return;
    }

    const isImg = quotedMessage.hasMedia;

    if (isImg) {
        const media = await quotedMessage.downloadMedia();
        quotedMessage.reply(media, message.from, { sendMediaAsSticker: true });
    }
}