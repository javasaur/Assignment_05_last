import {mockMessages} from "../Mocks/MockMessages";
import {IMessagesState} from "./IMessagesState";

export class MessagesStore {
    static instance: MessagesStore;
    messages: IMessagesState;

    constructor() {
        this.messages = mockMessages;
    }

    static getInstance() {
        if (!MessagesStore.instance) {
            MessagesStore.instance = new MessagesStore();
        }

        return MessagesStore.instance;
    }

    createAndAddMessage(ownerId: number, authorId: number, content: string, dateTimestamp: number, ownerType: string) {
        if(content === '') {
            return false;
        }

        const id = this.getIdOfMessagesChunk(ownerType, ownerId, authorId);

        if(!this.messages[id]) {
            this.messages[id] = [];
        }
        const message = {
            ownerId,
            authorId,
            content,
            dateTimestamp
        }
        this.messages[id].push(message);
        return true;
    }

    getAllMessagesForId(ownerType: string, ownerId: number, authorId: number) {
        const chunkId = this.getIdOfMessagesChunk(ownerType, ownerId, authorId);
        if(!!chunkId && this.messages[chunkId]) {
            return this.messages[chunkId];
        }
        return [];
    }

    getIdOfMessagesChunk(ownerType: string, ownerId: number, authorId: number) {
        // User dialogues are many-to-many
        // One user might have several dialogues with other users
        if(ownerType === 'user') {
            const id = Math.min(ownerId, authorId) + '_' + Math.max(ownerId, authorId);
            return id;
        }

        // Group dialogue is one-to-many
        // All users access the same group instance
        if(ownerType === 'group') {
            return ownerId;
        }

        return -1; // To fix with assertion error
        // throw new AssertionError('Unknown type of dialogue owner!');
    }
}