import MessagesDB from "../lib/messagesdb";
import {rethrow} from '../util/helpers';
import * as services from '../services/';

export default class Messages {
    static async addMessageToDialogue(dialogueID, message) {
        return MessagesDB.getInstance().addMessageToDialogue(dialogueID, message).catch(rethrow);
    }

    static async getAllDialogueMessages(dialogueID) {
        try {
            let messages = await MessagesDB.getInstance().getAllDialogueMessages(dialogueID);
            messages = messages.map(async msg => {
                const author = await services.Users.getUserByID(msg.authorId);
                const name = author ? author.name : 'UNEXISTING_USER';
                return {
                    ...msg,
                    authorName: name
                }
            });
            return Promise.all(messages);
        } catch (err) {
            throw err;
        }
    }
}