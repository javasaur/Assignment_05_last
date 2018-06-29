import MessagesDB from "../lib/messagesdb";
import {rethrow} from '../util/helpers';
import * as services from '../services/';
import UsersDB from "../lib/usersdb";
import GroupsDB from "../lib/groupsdb";

export default class Messages {
    static async addMessageToDialogue(dialogueID, message) {
        try {
            let isPrivate = false;
            const dialogue = await GroupsDB.getInstance().getGroupByID(dialogueID);
            if(!dialogue) {
                const regex = new RegExp(/\w+_\w+/);
                if(!regex.test(dialogueID)) {
                    throw new Error(`Unknow dialogue format ${dialogueID}`)
                }
                isPrivate = true;
                await GroupsDB.getInstance().addPrivateGroup(dialogueID);
                await MessagesDB.getInstance().createMessageChunk(dialogueID);
            }
            await MessagesDB.getInstance().addMessageToDialogue(dialogueID, message);
            if(isPrivate) {
                const secondCompanion = await GroupsDB.getInstance().getSecondCompanionID(dialogueID, message.authorId);
                console.log(`second companio is: ${secondCompanion}`);
                await UsersDB.getInstance().addUserToDialogueRelation(secondCompanion, dialogueID);
            }
            await UsersDB.getInstance().addUserToDialogueRelation(message.authorId, dialogueID);
           await GroupsDB.getInstance().addUserIfMissing(message.authorId, dialogueID);
        } catch (err) {
            throw err;
        }
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