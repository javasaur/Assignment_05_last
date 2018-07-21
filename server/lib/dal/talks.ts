import * as QueryBuilder from '../querybuilders';
import {contains} from "../../helpers/common";
import {dbQuery, escape} from "../../helpers/db";
import CustomError from "../../helpers/CustomError";
import Logger from "../../helpers/logger";

export default class Talks {
    static addPrivateTalk(talkID: string) {
        const query = QueryBuilder.Talks.addPrivateTalk(escape(talkID));
        return {
            query,
            execute: async () => {
                    await dbQuery(query);
                    return true;
            }
        }
    }

    static addPublicRootTalk(talkName: string) {
        const query = Talks.addPublicTalk(talkName).query;
        return {
            query,
            execute: async () => {
                    await Talks.addPublicTalk(talkName).execute();
                    return true;
            }
        }
    }

    static addPublicSubtalk(talkName: string, parentID: string) {
        const query = QueryBuilder.Talks.addPublicSubtalk(escape(talkName), escape(parentID));
        return {
            query,
            execute: async () => {
                    await dbQuery(query);
                    return true;
            }
        }
    }

    static addPublicTalk(talkName: string) {
        const query = QueryBuilder.Talks.addPublicTalk(escape(talkName));
        return {
            query,
            execute: async () => {
                try {
                    await dbQuery(query);
                    return true;
                } catch (err) {
                    Logger.log(`Failed to add a new talk ${talkName} , err: ${JSON.stringify(err)}`);
                    throw new Error(`DB request failed, try later!`);
                }
            }
        }
    }

    static async existsTalkWithID(talkID: string) {
        return !!(await Talks.getTalkByID(talkID).execute());
    }

    static getAllPublicTalks() {
        const query = QueryBuilder.Talks.getAllPublicTalks();
        return {
            query,
            execute: async () => {
                try {
                    return await dbQuery(query);
                } catch (err) {
                    Logger.log(`Failed to fetch all public groups , err: ${JSON.stringify(err)}`);
                    throw new Error(`DB request failed, try later!`);
                }
            }
        }
    }

    static getSiblingTalks(talkID: string) {
        const query = QueryBuilder.Talks.getSiblingTalks(talkID);
        return {
            query,
            execute: async () => {
                try {
                    return await dbQuery(query);
                } catch (err) {
                    Logger.log(`Failed to fetch sibling talks for ${talkID}, err: ${JSON.stringify(err)}`);
                    throw new Error(`DB request failed, try later!`);
                }
            }
        }
    }

    static getSubtalksByParentID(parentID: string) {
        const query = QueryBuilder.Talks.getSubtalksByParentID(parentID);
        return {
            query,
            execute: async () => {
                try {
                    return await dbQuery(query);
                } catch (err) {
                    Logger.log(`Failed to fetch subtalks for ${parentID}, err: ${JSON.stringify(err)}`);
                    throw new Error(`DB request failed, try later!`);
                }
            }
        }
    }

    static getTalkByID(talkID: string) {
        const query = QueryBuilder.Talks.getTalkByID(escape(talkID));
        return {
            query,
            execute: async () => {
                try {
                    const talks = await dbQuery(query);
                    return talks.length > 0 ? talks[0] : null;
                } catch (err) {
                    Logger.log(`Failed to fetch talk by id ${talkID} , err: ${JSON.stringify(err)}`);
                    throw new Error(`DB request failed, try later!`);
                }
            }
        }
    }

    static getTalksHierarchy() {
        const query = QueryBuilder.Talks.getTalksHierarchy();
        return {
            query,
            execute: async () => {
                try {
                    return await dbQuery(query);
                } catch (err) {
                    Logger.log(`Failed to fetch groups hierarchy , err: ${JSON.stringify(err)}`);
                    throw new Error(`DB request failed, try later!`);
                }
            }
        }
    }

    static async hasSubtalks(parentID: string) {
        const query = QueryBuilder.Talks.countSubtalks(escape(parentID));
        const res = await dbQuery(query);
        const count = res[0].subtalkCount;
        return count > 0;
    }

    static async isNameDuplicateUnderRoot(talkName: string) {
        const query = QueryBuilder.Talks.countDuplicateNamesUnderRoot(escape(talkName));
        const res = await dbQuery(query);
        const count = res[0].namesCount;
        return count > 0;
    }

    static async isNameDuplicateUnderTalk(talkName: string, parentID: string) {
        const query = QueryBuilder.Talks.countDuplicateNamesUnderParent(escape(talkName), escape(parentID));
        const res = await dbQuery(query);
        const count = res[0].namesCount;
        return count > 0;
    }

    static moveSubtalksUp(talkID: string) {
        const query = QueryBuilder.Talks.moveSubtalksUp(escape(talkID));
        return {
            query,
            execute: async () => {
                    await dbQuery(query);
                    return true;
            }
        }
    }

    static removeTalkByID(talkID: string) {
        const query = QueryBuilder.Talks.removeTalkByID(escape(talkID));
        return {
            query,
            execute: async () => {
                    await dbQuery(query);
                    return true;
            }
        }
    }

    static async willCauseNameConflict(talkID: string) {
        const subtalks = await this.getSubtalksByParentID(talkID).execute();
        const siblings = await this.getSiblingTalks(talkID).execute();

        const subNames = subtalks.map(s => s.name);
        const sibNames = siblings.map(s => s.name);
        for(let name of subNames) {
            if(contains(sibNames, name)) {
                return {name};
            }
        }
        return false;
    }
}