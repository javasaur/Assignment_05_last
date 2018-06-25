import DB from './db';

export default class MessagesDB {
    static instance: MessagesDB;
    data: {};

    constructor() {
    }

    async addMessageToDialogue(dialogueID, message) {
        try {
            if(!this.data[dialogueID]) {
                throw new Error(`Trying to add message to unexisting dialogue ${dialogueID}`);
            }

            // Should be ATOMIC?
            this.data[dialogueID].push(message);
            this.updateStore()
        } catch (err) {
            throw new Error(`Failed to add message: ${err}`)
        }
    }

    static getInstance() {
        if(!MessagesDB.instance) {
            MessagesDB.instance = new MessagesDB();
        }
        return MessagesDB.instance;
    }

    async getAllDialogueMessages(dialogueID) {
        return this.data[dialogueID] || [];
    }

    async init() {
        try {
            const res = await DB.readFromStore(DB.MESSAGES_STORE);
            this.data = res;
        } catch (err) {
            throw new Error(`MessagesDB initialization failed: ${err.message}`);
        }
    }

    async updateStore() {
        DB.writeToStore(DB.MESSAGES_STORE, JSON.stringify(this.data));
    }
}