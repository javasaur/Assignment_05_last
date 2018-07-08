import GroupsService from './groups';
import UsersService from './users';
import * as DAL from '../lib/dal';
import CustomError from "../lib/CustomError";

export default class UsersGroups {
    static async addUserToGroup(userID, groupID) {
        if(await DAL.Talks.hasSubtalks(groupID)) {
            throw new CustomError(`Can't add user to group, which contains subgroups`)
        }
        if(await DAL.UsersTalks.isUserInTalk(userID, groupID)) {
            throw new CustomError(`User already in group`);
        }
        return DAL.UsersTalks.addUserToTalk(userID, groupID);
    }

    static async getUsersByGroupID(talkID) {
        return DAL.UsersTalks.getUsersByTalkID(talkID);
    }


    static async buildAdminJSONTree() {
        try {
            const hierarchy = await DAL.Talks.getTalksHierarchy();
            const flatArr = UsersGroups.__populateFlatArray(hierarchy);

            for(let t of flatArr) {
                if(!t) {
                    continue;
                }

                if(t.isSubtalk) {
                    UsersGroups.__decomposeHierarchyPath(t, flatArr);
                }
            }

            const filtered = flatArr.filter(t => t !== undefined && !t.isSubtalk);
            return filtered;
        } catch (err) {
            throw new Error(`Failed to build admin JSON tree: ${err.message}`);
        }
    }

    static async buildJSONTree(userID) {
        try {
            const hierarchy = await DAL.Talks.getTalksHierarchy();
            const flatArr = UsersGroups.__populateFlatArray(hierarchy);

            for(let t of flatArr) {
                if(!t) {
                    continue;
                }

                if(t.isSubtalk) {
                    UsersGroups.__decomposeHierarchyPath(t, flatArr);
                }

                const users = await DAL.UsersTalks.getUsersByTalkID(t.id);
                UsersGroups.__populateWithUsers(t, users, userID);
            }

            const filtered = flatArr.filter(t => t !== undefined && !t.isSubtalk);

            const privateTalks = await DAL.UsersTalks.getPrivateTalks(userID);
            for(let pm of privateTalks) {
                filtered.push({
                    id: pm.talk_id,
                    type: 'user',
                    name: pm.name
                })
            }

            return filtered;
        } catch (err) {
            throw new Error(`Failed to build JSON tree for ${userID}: ${err.message}`);
        }
    }

    static async removeUser(id) {
        return DAL.Users.removeUser({id});
    }

    static __populateFlatArray(hierarchy) {
        const flatArr = [];
        hierarchy.forEach(t => {
            const path = t.path.split(',');
            const isSubtalk = path.length > 1;
            flatArr[t.talk_id] =  {
                id: t.talk_id,
                type: 'group',
                name: t.name,
                items: [],
                path,
                isSubtalk,
            }
        });
        return flatArr;
    }

    static __decomposeHierarchyPath(talk, flatArr) {
        for(let i = talk.path.length - 1; i >= 1; i--) {
            const subTalk = flatArr[talk.path[i]];
            const parent = flatArr[talk.path[i-1]];
            if(!parent.items.includes(subTalk)) {
                parent.items.push(subTalk);
            }
        }
    }

    static __populateWithUsers(talk, users, userID) {
        users.forEach(u => {
            talk.items.push({
                id: Math.min(+u.user_id, +userID) + '_' + Math.max(+u.user_id, +userID),
                type: 'user',
                name: u.name,
                age: u.age
            })
        })
    }

    static async removeUserFromGroup(userID, talkID) {
        return DAL.UsersTalks.removeUserFromTalk(talkID, userID);
    }
}