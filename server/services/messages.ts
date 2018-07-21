import * as DAL from '../lib/dal';
import * as services from '../services';
import {DEFAULT_SQL_ERROR, execAsTransaction, transaction} from "../helpers/db";
import {logAndThrow} from "../helpers/common";

export default class Messages {
    static async addMessageToDialogue(dialogueID, message) {
        try {
            // Private talks
            const privatePattern = /^\d{1,}_\d{1,}$/;
            if(dialogueID.match(privatePattern)) {
                let t = transaction();
                let treeChanged = false;

                // Update the tree in case new private talk was created
                if(!(await DAL.Talks.existsTalkWithID(dialogueID))) {
                    t.append(DAL.Talks.addPrivateTalk(dialogueID).query);
                    t.append(DAL.UsersTalks.addUsersToPrivateTalk(dialogueID).query);
                    treeChanged = true;
                }
                t.append(DAL.Messages.addMessage(message.content, message.authorId, dialogueID).query);
                t.append(DAL.Messages.incrementUnreadMessages(dialogueID).query);

                await t.buildAndExecute();
                if(treeChanged) {
                    services.Socket.notifyOnTreeChange();
                }
                return;
            }

            // Public talks (groups)
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
        } catch (err) {
            logAndThrow(err, DEFAULT_SQL_ERROR);
        }
    }

    static async getAllDialogueMessages(talkID: string) {
        try {
            return await DAL.Messages.getAllMessagesByTalkID(talkID).execute();
        } catch (err) {
            logAndThrow(err, DEFAULT_SQL_ERROR);
        }
    }

    static async nullDialogueMessages(talkID: string, userID: string) {
        try {
            return DAL.Messages.nullUnreadMessages(talkID, userID).execute();
        } catch (err) {
            logAndThrow(err, DEFAULT_SQL_ERROR);
        }
    }
}