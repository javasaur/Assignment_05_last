import GroupsService from './groups';
import UsersService from './users';
import {rethrow} from "../util/helpers";
import UsersDB from "../lib/usersdb";
import * as DAL from '../lib/dal';
import CustomError from "../lib/CustomError";

export default class UsersGroups {
    static async addUserToGroup(userID, groupID) {
        if(await DAL.Talks.hasSubtalks(groupID)) {
            throw new CustomError(`Can't add user to group, which contains subgroups`)
        }
        return DAL.UsersTalks.addUserToTalk(userID, groupID);
    }

    static async getAssociatedGroups(userID) {
        try {
            const groupIDs = await UsersService.getAssociatedGroupsIDs(userID);
            const groups = await GroupsService.getGroupsByIDs(groupIDs);
            return groups;
        } catch (err) {
            throw new Error(`Failed to get associated groups: ${err.message}`)
        }
    }

    static async getPrivateGroups(userID) {
        try {
            const privateGroupsIDs = await UsersService.getPrivateGroupsIDs(userID);
            let privateGroups;
            if(privateGroupsIDs) {
                // privateGroupsIDs can be void?!!
                privateGroups = await GroupsService.getGroupsByIDs(privateGroupsIDs);
            }
            return privateGroups || [];
        } catch (err) {
            throw new Error(`Failed to get private groups for ${userID}: ${err.message}`);
        }
    }

    static async getUsersByGroupID(talkID) {
        return DAL.UsersTalks.getUsersByTalkID(talkID);
    }


    static async buildAdminJSONTree() {
        try {
            const publicGroups = await GroupsService.getPublicRootGroups();
            const spreadGroups = [];
            if(!publicGroups) return;

            publicGroups.forEach(g => spreadGroups.push({...g}));
            if(spreadGroups) {
                console.log(spreadGroups);
                for(let group of spreadGroups) {
                    await UsersGroups.decomposeAdminGroup(group);
                }
            }
            return spreadGroups;
        } catch (err) {
            throw new Error(`Failed to build admin JSON tree: ${err.message}`);
        }
    }

    static async buildJSONTree(userID) {
        try {
            const publicGroups = await GroupsService.getPublicRootGroups();
            const privateGroups = await this.getPrivateGroups(userID);

            if(!publicGroups) return [];

            const groups = [...publicGroups].concat([...privateGroups]);
            const spreadGroups = [];
            groups.forEach(g => spreadGroups.push({...g}));
            if(spreadGroups) {
                for(let group of spreadGroups) {
                    await UsersGroups.decomposeGroup(group, userID);
                }
            }
            return spreadGroups;
        } catch (err) {
            throw new Error(`Failed to build JSON tree for ${userID}: ${err.message}`);
        }
    }

    static async removeUser(id) {
        return DAL.Users.removeUser({id});
    }

    static async decomposeAdminGroup(group) {
        group.items = [];

        if(group.groups.length > 0) {
            for(let subgroupID of group.groups) {
                const subgroup = await GroupsService.getGroupByID(subgroupID);
                group.items.push(subgroup);
                UsersGroups.decomposeAdminGroup(subgroup);
            }
        }
    }

    static async decomposeGroup(group, userID) {
        group.items = [];

        if(group.name === 'PM') {
            const id = await GroupsService.getSecondCompanionID(group.id, userID + '');
            const user = await UsersService.getUserByID(id);
            group.name = user.name;
            group.type = 'user';
            return;
        }

        if(group.groups.length > 0) {
            for(let subgroupID of group.groups) {
                const subgroup = await GroupsService.getGroupByID(subgroupID);
                group.items.push(subgroup);
                UsersGroups.decomposeGroup(subgroup, userID);
            }
        }

        const users = await UsersService.getUsersByIDs(group.users);
        if(users && users.length > 0) {
            console.log(users);
            for (let user of users) {
                user.id = Math.min(userID, user.id) + '_' + Math.max(userID, user.id);
            }
            group.items.push(...users);
        }
    }

    static async removeUserFromGroup(userID, talkID) {
        return DAL.UsersTalks.removeUserFromTalk(talkID, userID);
    }
}