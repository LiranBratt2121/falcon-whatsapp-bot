import { Client, LocalAuth, Message, MessageAck } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import { handleDefault, handlePing } from './handles/handleTests';
import { handleCreateSticker } from './handles/handleStickers';
import { handleMetionEveryone } from './handles/handleMentions';

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
    switch (message.body.trim()) {
        case '!ping':
            handlePing(message);
            break;
        case '!sticker':
            handleCreateSticker(message);
            break;
        case '!everyone':
            handleMetionEveryone(message);
            break;
        default:
            handleDefault(message);
    }
})


client.initialize()