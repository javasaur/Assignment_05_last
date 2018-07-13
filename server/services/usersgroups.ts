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

        await DAL.UsersTalks.addUserToTalk(userID, groupID);
        await DAL.Messages.addUnreadMessagesCounter(groupID, userID);
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

            const privateTalks = await DAL.UsersTalks.getPrivateTalks(userID);
            for(let pm of privateTalks) {
                flatArr.push({
                    id: pm.talk_id,
                    type: 'user',
                    name: pm.name
                })
            }

            for(let t of flatArr) {
                if(!t) {
                    continue;
                }

                if(t.isSubtalk) {
                    UsersGroups.__decomposeHierarchyPath(t, flatArr);
                }

                if(t.type === 'group') {
                    const users = await DAL.UsersTalks.getUsersByTalkID(t.id);
                    await UsersGroups.__populateWithUsers(t, users, userID);
                }

                const unread = await DAL.Messages.getUnreadMessagesCount(t.id, userID);
                t.unread = unread;
            }

            const filtered = flatArr.filter(t => t !== undefined && !t.isSubtalk);

            // const privateTalks = await DAL.UsersTalks.getPrivateTalks(userID);
            // for(let pm of privateTalks) {
            //     filtered.push({
            //         id: pm.talk_id,
            //         type: 'user',
            //         name: pm.name
            //     })
            // }

            return filtered;
        } catch (err) {
            throw new Error(`Failed to build JSON tree for ${userID}: ${err.message}`);
        }
    }

    static async removeUser(userID) {
        await DAL.UsersTalks.removeUserFromAllTalks(userID);
        await DAL.Messages.removeAllCounters(userID);
        await DAL.Users.removeUser({id: userID});
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

    static async __populateWithUsers(talk, users, userID) {
        for(let u of users)
        {
            const unread = await DAL.Messages.getUnreadMessagesCount(talk.id, userID);
            talk.items.push({
                id: Math.min(+u.user_id, +userID) + '_' + Math.max(+u.user_id, +userID),
                type: 'user',
                name: u.name,
                age: u.age,
                unread
            })
        }
    }

    static async removeGroup(talkID: string) {
        if(!(await DAL.Talks.existsTalkWithID(talkID))) {
            throw new CustomError(`Group doesn't exist`)
        }

        // No subtalks, remove related users, messages and the group itself
        if(!(await DAL.Talks.hasSubtalks(talkID))) {
            await DAL.UsersTalks.removeAllUsersFromTalk(talkID);
            await DAL.Messages.removeAllMessagesFromTalk(talkID);
            await DAL.Talks.removeTalkByID(talkID);
            return;
        }

        // Subgroups, need to change reference and check for siblings name conflict
        const nameConflict = await DAL.Talks.willCauseNameConflict(talkID);
        if(nameConflict) {
            throw new CustomError(`Name conflict on future sibling - ${nameConflict.name}`)
        }
        await DAL.Talks.moveSubtalksUp(talkID);
        await DAL.Talks.removeTalkByID(talkID);
    }

    static async removeUserFromGroup(userID, talkID) {
        await DAL.UsersTalks.removeUserFromTalk(talkID, userID);
        await DAL.Messages.removeUnreadMessagesCounter(talkID, userID);
    }
}