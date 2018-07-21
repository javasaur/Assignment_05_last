import Logger from "../../helpers/logger"
import * as QueryBuilder from '../querybuilders';
import {dbQuery, escape} from "../../helpers/db";

export default class Messages {
    static addMessage(content: string, userID: string, talkID: string) {
        const query = QueryBuilder.Messages.addMessage(escape(content), escape(userID), escape(talkID));
        return {
            query,
            execute: async () => {
                    await dbQuery(query);
                    return true;
            }
        }
    }

    static addUnreadMessagesCounter(talkID: string, userID: string) {
        const query = QueryBuilder.Messages.addUnreadMessagesCounter(escape(talkID), escape(userID));
        return {
            query,
            execute: async () => {
                    await dbQuery(query);
                    return true;
            }
        }
    }

    static incrementUnreadMessages(talkID: string) {
        const query = QueryBuilder.Messages.incrementUnreadMessages(escape(talkID));
        return {
            query,
            execute: async () => {
                    await dbQuery(query);
                    return true;
            }
        }
    }

    static getAllMessagesByTalkID(talkID: string) {
        const query = QueryBuilder.Messages.getAllMessagesByTalkID(escape(talkID));
        return {
            query,
            execute: async () => {
                    const messages = await dbQuery(query);
                    return messages;
            }
        }
    }

    static getUnreadMessagesCount(talkID: string, userID: string) {
        const query = QueryBuilder.Messages.getUnreadMessagesCount(escape(talkID), escape(userID));
        return {
            query,
            execute: async () => {
                try {
                    const res = await dbQuery(query);
                    return res.length > 0 ? res[0].counter : 0;
                } catch (err) {
                    Logger.log(`Failed to fetch msg counter for talk ${talkID} user ${userID}, err: ${JSON.stringify(err)}`);
                    throw new Error(`DB request failed, try later!`);
                }
            }
        }
    }

    static nullUnreadMessages(talkID: string, userID: string) {
        const query = QueryBuilder.Messages.nullUnreadMessages(escape(talkID), escape(userID));
        return {
            query,
            execute: async () => {
                try {
                    await dbQuery(query);
                    return true;
                } catch (err) {
                    Logger.log(`Failed to null unread message count for ${talkID} , err: ${JSON.stringify(err)}`);
                    throw new Error(`DB request failed, try later!`);
                }
            }
        }
    }

    static removeAllCountersForTalk(talkID: string) {
        const query = QueryBuilder.Messages.removeAllCountersForTalk(escape(talkID));
        return {
            query,
            execute: async () => {
                    await dbQuery(query);
                    return true;
            }
        }
    }

    static removeAllCountersForUser(userID: string) {
        const query = QueryBuilder.Messages.removeAllCountersForUser(escape(userID));
        return {
            query,
            execute: async () => {
                try {
                    await dbQuery(query);
                    return true;
                } catch (err) {
                    Logger.log(`Failed to remove counters for user ${userID} , err: ${JSON.stringify(err)}`);
                    throw new Error(`DB request failed, try later!`);
                }
            }
        }
    }

    static removeAllMessagesFromTalk(talkID: string) {
        const query = QueryBuilder.Messages.removeAllMessagesFromTalk(escape(talkID));
        return {
            query,
            execute: async () => {
                    await dbQuery(query);
                    return true;
            }
        }
    }

    static removeUnreadMessagesCounter(talkID: string, userID: string) {
        const query = QueryBuilder.Messages.removeUnreadMessagesCounter(escape(talkID), escape(userID));
        return {
            query,
            execute: async () => {
                try {

                    await dbQuery(query);
                    return true;
                } catch (err) {
                    Logger.log(`Failed to remove unread messages counter to talk ${talkID} , err: ${JSON.stringify(err)}`);
                    throw new Error(`DB request failed, try later!`);
                }
            }
        }
    }
}