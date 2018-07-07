import MessagesDB from "../lib/messagesdb";
import UsersDB from "../lib/usersdb";
import GroupsDB from "../lib/groupsdb";
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

        // try {
        //     let isPrivate = false;
        //     const dialogue = await GroupsDB.getInstance().getGroupByID(dialogueID);
        //     if(!dialogue) {
        //         const regex = new RegExp(/\w+_\w+/);
        //         if(!regex.test(dialogueID)) {
        //             throw new Error(`Unknow dialogue format ${dialogueID}`)
        //         }
        //         isPrivate = true;
        //         await GroupsDB.getInstance().addPrivateGroup(dialogueID);
        //         await MessagesDB.getInstance().createMessageChunk(dialogueID);
        //     }
        //     await MessagesDB.getInstance().addMessageToDialogue(dialogueID, message);
        //     if(isPrivate) {
        //         const secondCompanion = await GroupsDB.getInstance().getSecondCompanionID(dialogueID, message.authorId);
        //         console.log(`second companio is: ${secondCompanion}`);
        //         await UsersDB.getInstance().addUserToDialogueRelation(secondCompanion, dialogueID);
        //     }
        //     await UsersDB.getInstance().addUserToDialogueRelation(message.authorId, dialogueID);
        //    await GroupsDB.getInstance().addUserIfMissing(message.authorId, dialogueID);
        // } catch (err) {
        //     throw err;
        // }
    }

    static async getAllDialogueMessages(talkID: string) {
        return DAL.Messages.getAllMessagesByTalkID(talkID);
    }
}