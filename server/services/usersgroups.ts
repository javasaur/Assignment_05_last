import GroupsService from './groups';
import UsersService from './users';
import {rethrow} from "../util/helpers";
import UsersDB from "../lib/usersdb";

export default class UsersGroups {
    static async getAssociatedGroups(userID) {
        try {
            const groupIDs = await UsersService.getAssociatedGroupsIDs(userID);
            const groups = await GroupsService.getGroupsByIDs(groupIDs);
            return groups;
        } catch (err) {
            throw new Error(`Failed to get associated groups: ${err.message}`)
        }
    }

    static async buildJSONTree(userID) {
        try {
            const groups = await UsersGroups.getAssociatedGroups(userID);

            if(groups) {
                for(let group of groups) {
                    if(group.name === 'PM') {
                        const id = await GroupsService.getSecondCompanionID(group.id, userID + '');
                        const user = await UsersService.getUserByID(id);
                        group.name = user.name;
                        group.type = 'user';
                    }
                    const items = await UsersService.getUsersByIDs(group.items);

                    if(items) {
                        for (let item of items) {
                            item.id = Math.min(userID, item.id) + '_' + Math.max(userID, item.id);
                        }
                    }
                    group.items = items;
                }
            }
            return groups;
        } catch (err) {
            throw new Error(`Failed to build JSON tree for ${userID}: ${err.message}`);
        }
    }

    static async removeUser(id) {
        try {
            console.log(`before userdb removeUser`);
            //
            await UsersDB.getInstance().removeUser(id);
            console.log(`before entering removeUserToDialoguesLinks`);
            // await UsersDB.getInstance().removeUserToDialoguesLinks(id);
        } catch (err) {
            console.log(err);
            throw err;
        }

    }
}