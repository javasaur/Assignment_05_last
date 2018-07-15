"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const DAL = require("../lib/dal");
const CustomError_1 = require("../helpers/CustomError");
const db_1 = require("../helpers/db");
class UsersGroups {
    static addUserToGroup(userID, groupID) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield DAL.Talks.hasSubtalks(groupID)) {
                throw new CustomError_1.default(`Can't add user to group, which contains subgroups`);
            }
            if (yield DAL.UsersTalks.isUserInTalk(userID, groupID)) {
                throw new CustomError_1.default(`User already in group`);
            }
            yield db_1.execAsTransaction(DAL.UsersTalks.addUserToTalk(userID, groupID).query, DAL.Messages.addUnreadMessagesCounter(groupID, userID).query);
        });
    }
    static buildAdminJSONTree() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hierarchy = yield DAL.Talks.getTalksHierarchy().execute();
                const flatArr = UsersGroups.__populateFlatArray(hierarchy);
                for (let t of flatArr) {
                    if (!t) {
                        continue;
                    }
                    if (t.isSubtalk) {
                        UsersGroups.__decomposeHierarchyPath(t, flatArr);
                    }
                }
                const filtered = flatArr.filter(t => t !== undefined && !t.isSubtalk);
                return filtered;
            }
            catch (err) {
                throw new Error(`Failed to build admin JSON tree: ${err.message}`);
            }
        });
    }
    static buildJSONTree(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hierarchy = yield DAL.Talks.getTalksHierarchy().execute();
                const flatArr = UsersGroups.__populateFlatArray(hierarchy);
                const privateTalks = yield DAL.UsersTalks.getPrivateTalks(userID).execute();
                for (let pm of privateTalks) {
                    flatArr.push({
                        id: pm.talk_id,
                        type: 'user',
                        name: pm.name
                    });
                }
                for (let t of flatArr) {
                    if (!t) {
                        continue;
                    }
                    if (t.isSubtalk) {
                        UsersGroups.__decomposeHierarchyPath(t, flatArr);
                    }
                    if (t.type === 'group') {
                        const users = yield DAL.UsersTalks.getUsersByTalkID(t.id).execute();
                        yield UsersGroups.__populateWithUsers(t, users, userID);
                    }
                    const unread = yield DAL.Messages.getUnreadMessagesCount(t.id, userID).execute();
                    t.unread = unread;
                }
                const filtered = flatArr.filter(t => t !== undefined && !t.isSubtalk);
                return filtered;
            }
            catch (err) {
                throw new Error(`Failed to build JSON tree for ${userID}: ${err.message}`);
            }
        });
    }
    static getUsersByGroupID(talkID) {
        return __awaiter(this, void 0, void 0, function* () {
            return DAL.UsersTalks.getUsersByTalkID(talkID).execute();
        });
    }
    static removeUser(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.execAsTransaction(DAL.UsersTalks.removeUserFromAllTalks(userID).query, DAL.Messages.removeAllCountersForUser(userID).query, DAL.Users.removeUser({ id: userID }).query);
        });
    }
    static __decomposeHierarchyPath(talk, flatArr) {
        for (let i = talk.path.length - 1; i >= 1; i--) {
            const subTalk = flatArr[talk.path[i]];
            const parent = flatArr[talk.path[i - 1]];
            if (!parent.items.includes(subTalk)) {
                parent.items.push(subTalk);
            }
        }
    }
    static __populateFlatArray(hierarchy) {
        const flatArr = [];
        hierarchy.forEach(t => {
            const path = t.path.split(',');
            const isSubtalk = path.length > 1;
            flatArr[t.talk_id] = {
                id: t.talk_id,
                type: 'group',
                name: t.name,
                items: [],
                path,
                isSubtalk,
            };
        });
        return flatArr;
    }
    static __populateWithUsers(talk, users, userID) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let u of users) {
                const unread = yield DAL.Messages.getUnreadMessagesCount(talk.id, userID).execute();
                talk.items.push({
                    id: Math.min(+u.user_id, +userID) + '_' + Math.max(+u.user_id, +userID),
                    type: 'user',
                    name: u.name,
                    age: u.age,
                    unread
                });
            }
        });
    }
    static removeGroup(talkID) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield DAL.Talks.existsTalkWithID(talkID))) {
                throw new CustomError_1.default(`Group doesn't exist`);
            }
            // No subtalks, remove related users, messages and the group itself
            if (!(yield DAL.Talks.hasSubtalks(talkID))) {
                yield db_1.execAsTransaction(DAL.UsersTalks.removeAllUsersFromTalk(talkID).query, DAL.Messages.removeAllMessagesFromTalk(talkID).query, DAL.Messages.removeAllCountersForTalk(talkID).query, DAL.Talks.removeTalkByID(talkID).query);
                return;
            }
            // Subgroups, need to change reference and check for siblings name conflict
            const nameConflict = yield DAL.Talks.willCauseNameConflict(talkID);
            if (nameConflict) {
                throw new CustomError_1.default(`Name conflict on future sibling - ${nameConflict.name}`);
            }
            yield db_1.execAsTransaction(DAL.Talks.moveSubtalksUp(talkID).query, DAL.Talks.removeTalkByID(talkID).query);
        });
    }
    static removeUserFromGroup(userID, talkID) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.execAsTransaction(DAL.UsersTalks.removeUserFromTalk(talkID, userID).query, DAL.Messages.removeUnreadMessagesCounter(talkID, userID).query);
        });
    }
}
exports.default = UsersGroups;
//# sourceMappingURL=usersgroups.js.map