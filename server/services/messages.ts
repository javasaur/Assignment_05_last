import * as DAL from '../lib/dal';

export default class Messages {
    static async addMessageToDialogue(dialogueID, message) {
        const privatePattern = /^\d{1,}_\d{1,}$/;
        if(dialogueID.match(privatePattern)) {
            if(!(await DAL.Talks.existsTalkWithID(dialogueID))) {
                await DAL.Talks.addPrivateTalk(dialogueID);
                await DAL.UsersTalks.addUsersToPrivateTalk(dialogueID);
            }
            await DAL.Messages.addMessage(message.content, message.authorId, dialogueID);
            await DAL.Messages.incrementUnreadMessages(dialogueID);
            return;
        }

        // If user already in a talk -> plain add message
        // No need to create relations
        if(await DAL.UsersTalks.isUserInTalk(message.authorId, dialogueID)) {
            await DAL.Messages.addMessage(message.content, message.authorId, dialogueID);
            await DAL.Messages.incrementUnreadMessages(dialogueID);
            return;
        }

        // First add user to talk, then create his message
        await DAL.UsersTalks.addUserToTalk(message.authorId, dialogueID);
        await DAL.Messages.addMessage(message.content, message.authorId,dialogueID);
        await DAL.Messages.incrementUnreadMessages(dialogueID);
        return;
    }

    static async getAllDialogueMessages(talkID: string) {
        return DAL.Messages.getAllMessagesByTalkID(talkID);
    }

    static async nullDialogueMessages(talkID: string, userID: string) {
        return DAL.Messages.nullUnreadMessages(talkID, userID);
    }
}