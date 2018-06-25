import GroupsDB from "../lib/groupsdb";
import {rethrow} from '../util/helpers';

export default class Groups {
    static async getAllGroups() {
        return GroupsDB.getInstance().getAllGroups().catch(rethrow);
    }

    static async getSecondCompanionID(groupID, firstCompanionID) {
        return GroupsDB.getInstance().getSecondCompanionID(groupID, firstCompanionID).catch(rethrow);
    }

    static async getGroupByID(groupdID) {
        return GroupsDB.getInstance().getGroupByID(groupdID).catch(rethrow);
    }

    static async getGroupsByIDs(groupsIDs: Array<any>) {
        return GroupsDB.getInstance().getGroupsByIDs(groupsIDs).catch(rethrow);
    }
}