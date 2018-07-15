import * as DAL from '../lib/dal';
import Talks from "../lib/dal/talks";
import CustomError from "../helpers/CustomError";

export default class Groups {
    static async addRootGroup(name) {
        if (await Talks.isNameDuplicateUnderRoot(name)) {
            throw new CustomError(`A group with such name already exists`);
        }
        return DAL.Talks.addPublicRootTalk(name).execute();
    }

    static async addGroupUnderParent(name, parentID) {
        if (await Talks.isNameDuplicateUnderTalk(name, parentID)) {
            throw new CustomError(`A group with such name already exists`);
        }
        return DAL.Talks.addPublicSubtalk(name, parentID).execute();
    }
}