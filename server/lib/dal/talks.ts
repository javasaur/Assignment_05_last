import * as QueryBuilder from '../querybuilders';
import {contains, dbQuery, escape} from "../dbhelper";
import CustomError from "../CustomError";
import Logger from "../logger";

export default class Talks {
    static async addPrivateTalk(talkID: string) {
        try {
            const query = QueryBuilder.Talks.addPrivateTalk(escape(talkID));
            await dbQuery(query);
            return true;
        } catch (err) {
            Logger.log(`Failed to add a private talk ${talkID} , err: ${JSON.stringify(err)}`);
            throw new Error(`DB request failed, try later!`);
        }
    }

    static async addPublicTalk(talkName: string) {
        try {
            const query = QueryBuilder.Talks.addPublicTalk(escape(talkName));
            await dbQuery(query);
            return true;
        } catch (err) {
            Logger.log(`Failed to add a new talk ${talkName} , err: ${JSON.stringify(err)}`);
            throw new Error(`DB request failed, try later!`);
        }
    }

    static async addPublicRootTalk(talkName: string) {
        try {
            if (await Talks.isNameDuplicateUnderRoot(talkName)) {
                throw new CustomError(`A group with such name already exists`);
            }
            await Talks.addPublicTalk(talkName);
            return true;
        } catch (err) {
            if (err instanceof CustomError) {
                throw err;
            }

            // DB errors
            Logger.log(`Failed to create a root group ${talkName} , err: ${JSON.stringify(err)}`);
            throw new Error(`DB request failed, try later!`);
        }
    }

    static async addPublicSubtalk(talkName: string, parentID: string) {
        try {
            if (await Talks.isNameDuplicateUnderTalk(talkName, parentID)) {
                throw new CustomError(`A group with such name already exists`);
            }
            const query = QueryBuilder.Talks.addPublicSubtalk(escape(talkName), escape(parentID));
            await dbQuery(query);
            return true;
        } catch (err) {
            if (err instanceof CustomError) {
                throw err;
            }

            // DB errors
            Logger.log(`Failed to create a root group ${talkName} , err: ${JSON.stringify(err)}`);
            throw new Error(`DB request failed, try later!`);
        }
    }

    static async existsTalkWithID(talkID: string) {
        return !!(await Talks.getTalkByID(talkID));
    }

    static async getAllPublicTalks() {
        try {
            const query = QueryBuilder.Talks.getAllPublicTalks();
            return await dbQuery(query);
        } catch (err) {
            Logger.log(`Failed to fetch all public groups , err: ${JSON.stringify(err)}`);
            throw new Error(`DB request failed, try later!`);
        }
    }

    static async getTalkByID(talkID: string) {
        try {
            const query = QueryBuilder.Talks.getTalkByID(escape(talkID));
            const talks = await dbQuery(query);
            return talks.length > 0 ? talks[0] : null;
        } catch (err) {
            Logger.log(`Failed to fetch talk by id ${talkID} , err: ${JSON.stringify(err)}`);
            throw new Error(`DB request failed, try later!`);
        }
    }

    static async getSiblingTalks(talkID: string) {
        try {
            const query = QueryBuilder.Talks.getSiblingTalks(talkID);
            return await dbQuery(query);
        } catch (err) {
            Logger.log(`Failed to fetch sibling talks for ${talkID}, err: ${JSON.stringify(err)}`);
            throw new Error(`DB request failed, try later!`);
        }
    }

    static async getSubtalksByParentID(parentID: string) {
        try {
            const query = QueryBuilder.Talks.getSubtalksByParentID(parentID);
            return await dbQuery(query);
        } catch (err) {
            Logger.log(`Failed to fetch subtalks for ${parentID}, err: ${JSON.stringify(err)}`);
            throw new Error(`DB request failed, try later!`);
        }
    }

    static async getTalksHierarchy() {
        try {
            const query = QueryBuilder.Talks.getTalksHierarchy();
            return await dbQuery(query);
        } catch (err) {
            Logger.log(`Failed to fetch groups hierarchy , err: ${JSON.stringify(err)}`);
            throw new Error(`DB request failed, try later!`);
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

    static async moveSubtalksUp(talkID: string) {
        try {
            const query = QueryBuilder.Talks.moveSubtalksUp(escape(talkID));
            await dbQuery(query);
            return true;
        } catch (err) {
            Logger.log(`Failed to move  up subtalks of talk ${talkID}, err: ${JSON.stringify(err)}`);
            throw new Error(`DB request failed, try later!`);
        }
    }


    static async removeTalkByID(talkID: string) {
        try {
            const query = QueryBuilder.Talks.removeTalkByID(escape(talkID));
            await dbQuery(query);
            return true;
        } catch (err) {
            Logger.log(`Failed to remove talk by id ${talkID}, err: ${JSON.stringify(err)}`);
            throw new Error(`DB request failed, try later!`);
        }
    }

    static async willCauseNameConflict(talkID: string) {
        console.log(`checking naming conflict for ${talkID}`);
        const subtalks = await this.getSubtalksByParentID(talkID);
        const siblings = await this.getSiblingTalks(talkID);

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