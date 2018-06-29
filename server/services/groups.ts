import GroupsDB from "../lib/groupsdb";
import {rethrow} from '../util/helpers';

export default class Groups {
    static async addUserToGroup(userID, groupID) {
        return GroupsDB.getInstance().addUser(userID, groupID);
    }

    static async addRootGroup(name) {
        return GroupsDB.getInstance().addRootGroup(name).catch(rethrow);
    }

    static async addGroupUnderParent(name, parentID) {
        return GroupsDB.getInstance().addGroupUnderParent(name, parentID).catch(rethrow);
    }

    static async getAllGroups() {
        return GroupsDB.getInstance().getAllGroups().catch(rethrow);
    }

    static async getSecondCompanionID(groupID, firstCompanionID) {
        return GroupsDB.getInstance().getSecondCompanionID(groupID, firstCompanionID).catch(rethrow);
    }

    static async getGroupByID(groupdID) {
        return GroupsDB.getInstance().getGroupByID(groupdID).catch(rethrow);
    }

    static async getPublicGroups() {
        return GroupsDB.getInstance().getPublicGroups(null).catch(rethrow);
    }

    static async getPublicRootGroups() {
        return GroupsDB.getInstance().getPublicGroups('root').catch(rethrow)
    }

    static async getGroupsByIDs(groupsIDs: Array<any>) {
        return GroupsDB.getInstance().getGroupsByIDs(groupsIDs).catch(rethrow);
    }

    static async removeUserFromGroup(userID, groupID) {
        return GroupsDB.getInstance().removeUser(userID, groupID);
    }
}