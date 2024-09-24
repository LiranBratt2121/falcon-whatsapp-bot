import { Message } from "whatsapp-web.js";
import { ActionWord, ActionWordContent, ChatId } from "../utils/types";
import { replyMessage } from "../utils/send";

class ChatContainer {
    private actuatorWords: Record<ActionWord, ActionWordContent>; 
    private groupId: string;

    constructor(groupId: ChatId) {
        this.groupId = groupId;
        this.actuatorWords = {};
    }

    public getGroupId() {
        return this.groupId;
    }

    public getActionWords() {
        return this.actuatorWords;
    }

    public addActionWords(name: ActionWord, content: ActionWordContent) {
        this.actuatorWords[name] = content;
    }
}

class ChatsContainer {
    private chats: Record<ChatId, ChatContainer>;

    constructor() {
        this.chats = {};
    }

    private exists(groupId: string) {
        return this.chats.hasOwnProperty(groupId);
    }

    public addGroup(groupId: string) {
        if (this.exists(groupId)) {
            console.log("Group has already been added!");
            return;
        }

        this.chats[groupId] = new ChatContainer(groupId);
    }

    public async findChatId(message: Message): Promise<ChatId> {
        const chatId = (await message.getChat()).id._serialized;

        if (!chatId) {
            console.log("No chat ID");
            return "";
        }

        return chatId;
    }

    public wordInActionWords(actionWords: Record<ActionWord, ActionWordContent>, messageContent: string) {
        for (const actionWord in actionWords) {
            if (messageContent === actionWord) {
                return [actionWord, true];
            }
        }

        return [null, false];
    }

    public async addActionWord(message: Message, actionWord: ActionWord, content: ActionWordContent) {
        const chatId = await this.findChatId(message);
        const chat = this.chats[chatId];

        if (!chat) {
            console.log("Chat not found");
            this.addGroup(chatId);
            this.addActionWord(message, actionWord, content); // Recourtion to add the action if the group doesnt exist in the logs of the system.
            return;
        }

        chat.addActionWords(actionWord, content)
        replyMessage(message, `Added ${actionWord} to action words!\n${actionWord} -> ${content}`);
    }

    public async reply(message: Message) {
        const chatId = await this.findChatId(message);
        const chat = this.chats[chatId];

        if (!chat) {
            return;
        }

        const actionWords = chat.getActionWords();
        const messageContent = message.body;

        const [actionWord, isPresent] = this.wordInActionWords(actionWords, messageContent);

        if (!isPresent) {
            console.log(`${messageContent} is not in action words!`);
            return;
        }

        if (typeof actionWord !== "string") {
            console.log(`Action word is not a string ${actionWord}, type: ${typeof actionWord}`);
            return;
        }

        const replyContent = actionWords[actionWord];

        console.log(`Action word "${actionWord}" found in message. Replying with: "${replyContent}"`);
        replyMessage(message, replyContent);
    }
}


const chats = new ChatsContainer();

export const handleCustomReply = (message: Message) => {
    chats.reply(message); // Tries to reply. checks in the function if the action word exists
}

export const handleAddCustomReply = (message: Message) => {
    // !custom-reply <actionWord> <content-to-reply-with-may-use-spaces>
    const messageContent = message.body;
    const parsedContent = messageContent.split(' ');
    const actionWord = parsedContent[1];
    const content = parsedContent.slice(2).join(' ');

    chats.addActionWord(message, actionWord, content);
}
