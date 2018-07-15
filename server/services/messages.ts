import * as DAL from '../lib/dal';
import * as services from '../services';
import {execAsTransaction, transaction} from "../helpers/db";

export default class Messages {
    static async addMessageToDialogue(dialogueID, message) {
        const privatePattern = /^\d{1,}_\d{1,}$/;
        if(dialogueID.match(privatePattern)) {
            let t = transaction();
            if(!(await DAL.Talks.existsTalkWithID(dialogueID))) {
                t.append(DAL.Talks.addPrivateTalk(dialogueID).query);
                t.append(DAL.UsersTalks.addUsersToPrivateTalk(dialogueID).query);
            }
            t.append(DAL.Messages.addMessage(message.content, message.authorId, dialogueID).query);
            t.append(DAL.Messages.incrementUnreadMessages(dialogueID).query);

            await t.buildAndExecute();
            services.Socket.notifyOnTreeChange();
            return;
        }

        // If user already in a talk -> plain add message
        // No need to create relations
        if(await DAL.UsersTalks.isUserInTalk(message.authorId, dialogueID)) {
            await execAsTransaction(
                DAL.Messages.addMessage(message.content, message.authorId, dialogueID).query,
                DAL.Messages.incrementUnreadMessages(dialogueID).query
            )
            return;
        }

        // First add user to talk, then create his message
        await execAsTransaction(
            DAL.UsersTalks.addUserToTalk(message.authorId, dialogueID).query,
            DAL.Messages.addMessage(message.content, message.authorId,dialogueID).query,
            DAL.Messages.addUnreadMessagesCounter(dialogueID, message.authorId).query,
            DAL.Messages.incrementUnreadMessages(dialogueID).query
        )
        services.Socket.notifyOnTreeChange();
        return;
    }

    static async getAllDialogueMessages(talkID: string) {
        return DAL.Messages.getAllMessagesByTalkID(talkID).execute();
    }

    static async nullDialogueMessages(talkID: string, userID: string) {
        return DAL.Messages.nullUnreadMessages(talkID, userID).execute();
    }
}