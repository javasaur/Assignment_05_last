import Logger from "../../helpers/logger"
import * as QueryBuilder from '../querybuilders';
import {dbQuery, escape} from "../../helpers/db";

export default class Messages {
    static addMessage(content: string, userID: string, talkID: string) {
        const query = QueryBuilder.Messages.addMessage(escape(content), escape(userID), escape(talkID));
        return {
            query,
            execute: async () => {
                try {
                    await dbQuery(query);
                    return true;
                } catch (err) {
                    Logger.log(`Failed to add message to talk ${talkID} , err: ${JSON.stringify(err)}`);
                    throw new Error(`DB request failed, try later!`);
                }
            }
        }
    }

    static addUnreadMessagesCounter(talkID: string, userID: string) {
        const query = QueryBuilder.Messages.addUnreadMessagesCounter(escape(talkID), escape(userID));
        return {
            query,
            execute: async () => {
                try {
                    await dbQuery(query);
                    return true;
                } catch (err) {
                    Logger.log(`Failed to add unread messages counter to talk ${talkID} , err: ${JSON.stringify(err)}`);
                    throw new Error(`DB request failed, try later!`);
                }
            }
        }
    }

    static incrementUnreadMessages(talkID: string) {
        const query = QueryBuilder.Messages.incrementUnreadMessages(escape(talkID));
        return {
            query,
            execute: async () => {
                try {
                    await dbQuery(query);
                    return true;
                } catch (err) {
                    Logger.log(`Failed to increment unread message count for ${talkID} , err: ${JSON.stringify(err)}`);
                    throw new Error(`DB request failed, try later!`);
                }
            }
        }
    }

    static getAllMessagesByTalkID(talkID: string) {
        const query = QueryBuilder.Messages.getAllMessagesByTalkID(escape(talkID));
        return {
            query,
            execute: async () => {
                try {
                    const messages = await dbQuery(query);
                    return messages;
                } catch (err) {
                    Logger.log(`Failed to fetch messages of talk ${talkID} , err: ${JSON.stringify(err)}`);
                    throw new Error(`DB request failed, try later!`);
                }
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
                try {
                    await dbQuery(query);
                    return true;
                } catch (err) {
                    Logger.log(`Failed to remove counters for talk ${talkID} , err: ${JSON.stringify(err)}`);
                    throw new Error(`DB request failed, try later!`);
                }
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
                try {
                    await dbQuery(query);
                    return true;
                } catch (err) {
                    Logger.log(`Failed to delete messages of talk ${talkID} , err: ${JSON.stringify(err)}`);
                    throw new Error(`DB request failed, try later!`);
                }
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