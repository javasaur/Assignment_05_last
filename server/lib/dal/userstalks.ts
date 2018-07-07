import * as QueryBuilder from '../querybuilders';
import {dbQuery, escape} from "../dbhelper";
import Logger from "../logger";

export default class UsersTalks {
    static async addUsersToPrivateTalk(talkID) {
        try {
            const users = talkID.split('_');
            users.map(u => escape(u));
            const query = QueryBuilder.UsersTalks.addUsersToPrivateTalk(escape(talkID), users[0], users[1]);
            await dbQuery(query);
            return true;
        } catch (err) {
            Logger.log(`Failed to add users to private talk ${talkID}, err: ${JSON.stringify(err)}`);
            throw new Error(`DB request failed, try later!`);
        }
    }

    static async addUserToTalk(userID: string, talkID: string) {
        try {
            const query = QueryBuilder.UsersTalks.addUserToTalk(escape(userID), escape(talkID));
            await dbQuery(query);
            return true;
        } catch (err) {
            Logger.log(`Failed to add user ${userID} to talk ${talkID}, err: ${JSON.stringify(err)}`);
            throw new Error(`DB request failed, try later!`);
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
        console.log(`checking isUserInTal: ${userID} and ${talkID}`);
        const query = QueryBuilder.UsersTalks.getUsersCountUnderTalkByUserID(escape(userID), escape(talkID));
        const res = await dbQuery(query);
        const count = res[0].userCount;
        return count > 0;
    }

    static async getPrivateTalks(userID: string) {
        try {
            const query = QueryBuilder.UsersTalks.getPrivateTalksByUserID(userID);
            return await dbQuery(query);
        } catch (err) {
            Logger.log(`Failed to fetch private talks for user ${userID}, err: ${JSON.stringify(err)}`);
            throw new Error(`DB request failed, try later!`);
        }
    }

    static async getUsersByTalkID(talkID: string) {
        try {
            const query = QueryBuilder.UsersTalks.getUsersByTalkID(talkID);
            return await dbQuery(query);
        } catch (err) {
            Logger.log(`Failed to fetch users by talk id ${talkID}, err: ${JSON.stringify(err)}`);
            throw new Error(`DB request failed, try later!`);
        }
    }

    static async removeUserFromTalk(talkID: string, userID: string) {
        try{
            const query = QueryBuilder.UsersTalks.removeUserFromTalk(talkID, userID);
            await dbQuery(query);
            return true;
        } catch (err) {
            Logger.log(`Failed to fetch users by talk id ${talkID}, err: ${JSON.stringify(err)}`);
            throw new Error(`DB request failed, try later!`);
        }
    }
}