import Logger from "../../helpers/logger"
import * as QueryBuilder from '../querybuilders';
import {dbQuery, escape} from "../../helpers/db";

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

    static async addUnreadMessagesCounter(talkID: string, userID: string) {
        try {
            const query = QueryBuilder.Messages.addUnreadMessagesCounter(escape(talkID), escape(userID));
            await dbQuery(query);
            return true;
        } catch (err) {
            Logger.log(`Failed to add unread messages counter to talk ${talkID} , err: ${JSON.stringify(err)}`);
            throw new Error(`DB request failed, try later!`);
        }
    }

    static async incrementUnreadMessages(talkID: string) {
        try {
            const query = QueryBuilder.Messages.incrementUnreadMessages(escape(talkID));
            await dbQuery(query);
            return true;
        } catch (err) {
            Logger.log(`Failed to increment unread message count for ${talkID} , err: ${JSON.stringify(err)}`);
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

    static async getUnreadMessagesCount(talkID: string, userID: string) {
        try {
            const query = QueryBuilder.Messages.getUnreadMessagesCount(escape(talkID), escape(userID));
            const res = await dbQuery(query);
            return res.length > 0 ? res[0].counter : 0;
        } catch (err) {
            Logger.log(`Failed to fetch msg counter for talk ${talkID} user ${userID}, err: ${JSON.stringify(err)}`);
            throw new Error(`DB request failed, try later!`);
        }
    }

    static async nullUnreadMessages(talkID: string, userID: string) {
        try {
            const query = QueryBuilder.Messages.nullUnreadMessages(escape(talkID), escape(userID));
            await dbQuery(query);
            return true;
        } catch (err) {
            Logger.log(`Failed to null unread message count for ${talkID} , err: ${JSON.stringify(err)}`);
            throw new Error(`DB request failed, try later!`);
        }
    }

    static async removeAllCounters(userID: string) {
        try {
            const query = QueryBuilder.Messages.removeAllCounters(escape(userID));
            await dbQuery(query);
            return true;
        } catch (err) {
            Logger.log(`Failed to remove counters for user ${userID} , err: ${JSON.stringify(err)}`);
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

    static async removeUnreadMessagesCounter(talkID: string, userID: string) {
        try {
            const query = QueryBuilder.Messages.removeUnreadMessagesCounter(escape(talkID), escape(userID));
            await dbQuery(query);
            return true;
        } catch (err) {
            Logger.log(`Failed to remove unread messages counter to talk ${talkID} , err: ${JSON.stringify(err)}`);
            throw new Error(`DB request failed, try later!`);
        }
    }
}