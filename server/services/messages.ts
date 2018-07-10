import * as DAL from '../lib/dal';

export default class Messages {
    static async addMessageToDialogue(dialogueID, message) {
        console.log(`dialogueID is ${dialogueID}`);
        console.log(typeof dialogueID);
        const privatePattern = /^\d{1,}_\d{1,}$/;
        if(dialogueID.match(privatePattern)) {
            console.log('matched private pattern');
            if(!(await DAL.Talks.existsTalkWithID(dialogueID))) {
                console.log(`${dialogueID} doesn't existm creating talk`);
                await DAL.Talks.addPrivateTalk(dialogueID);
                await DAL.UsersTalks.addUsersToPrivateTalk(dialogueID);
            }
            await DAL.Messages.addMessage(message.content, message.authorId, dialogueID);
            return;
        }


        // If user already in a talk -> plain add message
        // No need to create relations
        if(await DAL.UsersTalks.isUserInTalk(message.authorId, dialogueID)) {
            return DAL.Messages.addMessage(message.content, message.authorId, dialogueID);
        }

        // First add user to talk, then create his message
        await DAL.UsersTalks.addUserToTalk(message.authorId, dialogueID);
        await DAL.Messages.addMessage(message.content, message.authorId,dialogueID);
        return;
    }

    static async getAllDialogueMessages(talkID: string) {
        return DAL.Messages.getAllMessagesByTalkID(talkID);
    }
}