import * as QueryBuilder from '../querybuilders';
import {dbQuery, escape} from "../../helpers/db";
import Logger from "../../helpers/logger";

export default class UsersTalks {
    static addUsersToPrivateTalk(talkID) {
        const users = talkID.split('_');
        users.map(u => escape(u));
        const query = QueryBuilder.UsersTalks.addUsersToPrivateTalk(escape(talkID), users[0], users[1]);
        return {
            query,
            execute: async () => {
                try {
                    await dbQuery(query);
                    return true;
                } catch (err) {
                    Logger.log(`Failed to add users to private talk ${talkID}, err: ${JSON.stringify(err)}`);
                    throw new Error(`DB request failed, try later!`);
                }
            }
        }
    }

    static addUserToTalk(userID: string, talkID: string) {
        const query = QueryBuilder.UsersTalks.addUserToTalk(escape(userID), escape(talkID));
        return {
            query,
            execute: async () => {
                try {
                    await dbQuery(query);
                    return true;
                } catch (err) {
                    Logger.log(`Failed to add user ${userID} to talk ${talkID}, err: ${JSON.stringify(err)}`);
                    throw new Error(`DB request failed, try later!`);
                }
            }
        }
    }

    static async countUsersUnderTalk(talkID: string) {
        try {
            const query = QueryBuilder.UsersTalks.getUsersCountUnderTalk(escape(talkID));
            const res = await dbQuery(query);
            const count = res[0].userCount;
            return count;
        } catch (err) {
            Logger.log(`Failed to count users for talk ${talkID}, err: ${JSON.stringify(err)}`);
            throw new Error(`DB request failed, try later!`);
        }
    }

    static async isUserInTalk(userID: string, talkID: string) {
        const query = QueryBuilder.UsersTalks.getUsersCountUnderTalkByUserID(escape(userID), escape(talkID));
        const res = await dbQuery(query);
        const count = res[0].userCount;
        return count > 0;
    }

    static getPrivateTalks(userID: string) {
        const query = QueryBuilder.UsersTalks.getPrivateTalksByUserID(escape(userID));
        return {
            query,
            execute: async () => {
                try {
                    return await dbQuery(query);
                } catch (err) {
                    Logger.log(`Failed to fetch private talks for user ${userID}, err: ${JSON.stringify(err)}`);
                    throw new Error(`DB request failed, try later!`);
                }
            }
        }
    }

    static getUsersByTalkID(talkID: string) {
        const query = QueryBuilder.UsersTalks.getUsersByTalkID(escape(talkID));
        return {
            query,
            execute: async () => {
                try {
                    return await dbQuery(query);
                } catch (err) {
                    Logger.log(`Failed to fetch users by talk id ${talkID}, err: ${JSON.stringify(err)}`);
                    throw new Error(`DB request failed, try later!`);
                }
            }
        }
    }

    static removeAllUsersFromTalk(talkID: string) {
        const query = QueryBuilder.UsersTalks.removeAllUsersFromTalk(escape(talkID));
        return {
            query,
            execute: async () => {
                try{
                    await dbQuery(query);
                    return true;
                } catch (err) {
                    Logger.log(`Failed to remove all users by talk id ${talkID}, err: ${JSON.stringify(err)}`);
                    throw new Error(`DB request failed, try later!`);
                }
            }
        }
    }

    static removeUserFromAllTalks(userID: string) {
        const query = QueryBuilder.UsersTalks.removeUserfromAllTalks(escape(userID));
        return {
            query,
            execute: async () => {
                try{
                    await dbQuery(query);
                    return true;
                } catch (err) {
                    Logger.log(`Failed to remove user ${userID} from all talks, err: ${JSON.stringify(err)}`);
                    throw new Error(`DB request failed, try later!`);
                }
            }
        }
    }

    static removeUserFromTalk(talkID: string, userID: string) {
        const query = QueryBuilder.UsersTalks.removeUserFromTalk(escape(talkID), escape(userID));
        return {
            query,
            execute: async () => {
                try{
                    await dbQuery(query);
                    return true;
                } catch (err) {
                    Logger.log(`Failed to remove user ${userID} from talk ${talkID}, err: ${JSON.stringify(err)}`);
                    throw new Error(`DB request failed, try later!`);
                }
            }
        }
    }
}