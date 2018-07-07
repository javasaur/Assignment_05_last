import * as QueryBuilder from '../querybuilders';
import {escape, dbQuery} from "../dbhelper";
import CustomError from "../CustomError";
import Logger from "../logger";

export default class Talks {
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
            if(await Talks.isNameDuplicateUnderRoot(talkName)) {
                throw new CustomError(`A group with such name already exists`);
            }
            await Talks.addPublicTalk(talkName);
            return true;
        } catch (err) {
            if(err instanceof CustomError) {
                throw err;
            }

            // DB errors
            Logger.log(`Failed to create a root group ${talkName} , err: ${JSON.stringify(err)}`);
            throw new Error(`DB request failed, try later!`);
        }
    }

    static async addPublicSubtalk(talkName: string, parentID: string) {
        try {
            if(await Talks.isNameDuplicateUnderTalk(talkName, parentID)) {
                throw new CustomError(`A group with such name already exists under ${talkName}`);
            }
            const query = QueryBuilder.Talks.addPublicSubtalk(escape(talkName), escape(parentID));
            await dbQuery(query);
            return true;
        } catch (err) {
            if(err instanceof CustomError) {
                throw err;
            }

            // DB errors
            Logger.log(`Failed to create a root group ${talkName} , err: ${JSON.stringify(err)}`);
            throw new Error(`DB request failed, try later!`);
        }
    }

    static async hasSubtalks(parentID: string) {
        const query = QueryBuilder.Talks.countSubtalks(escape(parentID));
        const res = await dbQuery(query);
        const count = res[0].subtalkCount;
        console.log(count);
        return count > 0;
    }

    static async isNameDuplicateUnderRoot(talkName: string) {
        const query = QueryBuilder.Talks.countDuplicateNamesUnderRoot(escape(talkName));
        const res = await dbQuery(query);
        const count = res[0].namesCount;
        return count > 0;
    }

    static async isNameDuplicateUnderTalk(talkName, parentID) {
        const query = QueryBuilder.Talks.countDuplicateNamesUnderParent(escape(talkName), escape(parentID));
        const res = await dbQuery(query);
        const count = res[0].namesCount;
        return count > 0;
    }
}