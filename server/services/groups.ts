import * as DAL from '../lib/dal';

export default class Groups {
    static async addRootGroup(name) {
        return DAL.Talks.addPublicRootTalk(name);
    }

    static async addGroupUnderParent(name, parentID) {
        return DAL.Talks.addPublicSubtalk(name, parentID);
    }
}