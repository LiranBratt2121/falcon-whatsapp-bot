import { Client, LocalAuth, Message, MessageAck } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import { handleDefault, handlePing } from './handles/handleTests';
import { handleCreateSticker } from './handles/handleStickers';
import { handleMentionEveryone } from './handles/handleMentions';
import { handleNotifyMe } from './handles/handleNotifyMe';
import { handleAddCustomReply, handleCustomReply } from './handles/handleCustomReply';

const client = new Client({
    authStrategy: new LocalAuth(),
    ffmpegPath: 'ffmpeg/bin/ffmpeg.exe'
});


client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
})

client.once('ready', () => {
    console.log('Client is ready!');
})

client.on("message_create", (message) => {
    const command = message.body.trim().split(' ')[0];

    try {
        switch (command) {
            case '!ping':
                handlePing(message);
                break;
            case '!sticker':
                handleCreateSticker(message);
                break;
            case '!everyone':
                // handleMentionEveryone(message);
                break;
            case "!notify-me": 
                handleNotifyMe(message);
                break;
            case "!custom-reply":
                handleAddCustomReply(message);
                break;
            default:
                if (handleDefault(message)){
                    break;
                }
                
                handleCustomReply(message);
        }

    } catch (error) {
        console.log("ERROR: ", error)
    }
})


client.initialize()
