import * as DAL from '../lib/dal';
import CustomError from "../helpers/CustomError";
import {DEFAULT_SQL_ERROR} from "../helpers/db";
import {_throw, logAndThrow} from "../helpers/common";

export default class Groups {
    static async addRootGroup(name) {
        try {
            if (await DAL.Talks.isNameDuplicateUnderRoot(name)) {
                throw new CustomError(`A group with such name already exists`);
            }
            return await DAL.Talks.addPublicRootTalk(name).execute();
        } catch (err) {
            err instanceof CustomError ? _throw(err) : logAndThrow(err, DEFAULT_SQL_ERROR);
        }
    }

    static async addGroupUnderParent(name, parentID) {
        try {
            if (await DAL.Talks.isNameDuplicateUnderTalk(name, parentID)) {
                throw new CustomError(`A group with such name already exists`);
            }
            if (await DAL.UsersTalks.hasUsers(parentID)) {
                throw new CustomError(`Parent group has users, can't add subgroup`);
            }
            return await DAL.Talks.addPublicSubtalk(name, parentID).execute();
        } catch (err) {
            err instanceof CustomError ? _throw(err) : logAndThrow(err, DEFAULT_SQL_ERROR);
        }
    }
}