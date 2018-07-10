import Logger from "../logger";
import * as QueryBuilder from '../querybuilders';
import {dbQuery, escape} from "../dbhelper";

export default class Messages {
    static async addMessage(content: string, userID: string, talkID: string) {
        try {
            const query = QueryBuilder.Messages.addMessage(escape(content), escape(userID), escape(talkID));
            await dbQuery(query);
            return true;
        } catch (err) {
            Logger.log(`Failed to add message to talk ${talkID} , err: ${JSON.stringify(err)}`);
            throw new Error(`DB request failed, try later!`);
        }

    }

    static async getAllMessagesByTalkID(talkID: string) {
        try {
            const query = QueryBuilder.Messages.getAllMessagesByTalkID(escape(talkID));
            const messages = await dbQuery(query);
            return messages;
        } catch (err) {
            Logger.log(`Failed to fetch messages of talk ${talkID} , err: ${JSON.stringify(err)}`);
            throw new Error(`DB request failed, try later!`);
        }
    }

    static async removeAllMessagesFromTalk(talkID: string) {
        try {
            const query = QueryBuilder.Messages.removeAllMessagesFromTalk(escape(talkID));
            await dbQuery(query);
            return true;
        } catch (err) {
            Logger.log(`Failed to delete messages of talk ${talkID} , err: ${JSON.stringify(err)}`);
            throw new Error(`DB request failed, try later!`);
        }
    }
}