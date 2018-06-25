import MessagesDB from "../lib/messagesdb";
import {rethrow} from '../util/helpers';

export default class Messages {
    static async addMessageToDialogue(dialogueID, message) {
        return MessagesDB.getInstance().addMessageToDialogue(dialogueID, message).catch(rethrow);
    }

    static async getAllDialogueMessages(dialogueID) {
        return MessagesDB.getInstance().getAllDialogueMessages(dialogueID).catch(rethrow);
    }
}