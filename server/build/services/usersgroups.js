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
const CustomError_1 = require("../lib/CustomError");
class UsersGroups {
    static addUserToGroup(userID, groupID) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield DAL.Talks.hasSubtalks(groupID)) {
                throw new CustomError_1.default(`Can't add user to group, which contains subgroups`);
            }
            if (yield DAL.UsersTalks.isUserInTalk(userID, groupID)) {
                throw new CustomError_1.default(`User already in group`);
            }
            return DAL.UsersTalks.addUserToTalk(userID, groupID);
        });
    }
    static getUsersByGroupID(talkID) {
        return __awaiter(this, void 0, void 0, function* () {
            return DAL.UsersTalks.getUsersByTalkID(talkID);
        });
    }
    static buildAdminJSONTree() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hierarchy = yield DAL.Talks.getTalksHierarchy();
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
                const hierarchy = yield DAL.Talks.getTalksHierarchy();
                const flatArr = UsersGroups.__populateFlatArray(hierarchy);
                for (let t of flatArr) {
                    if (!t) {
                        continue;
                    }
                    if (t.isSubtalk) {
                        UsersGroups.__decomposeHierarchyPath(t, flatArr);
                    }
                    const users = yield DAL.UsersTalks.getUsersByTalkID(t.id);
                    UsersGroups.__populateWithUsers(t, users, userID);
                }
                const filtered = flatArr.filter(t => t !== undefined && !t.isSubtalk);
                const privateTalks = yield DAL.UsersTalks.getPrivateTalks(userID);
                for (let pm of privateTalks) {
                    filtered.push({
                        id: pm.talk_id,
                        type: 'user',
                        name: pm.name
                    });
                }
                return filtered;
            }
            catch (err) {
                throw new Error(`Failed to build JSON tree for ${userID}: ${err.message}`);
            }
        });
    }
    static removeUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return DAL.Users.removeUser({ id });
        });
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
    static __decomposeHierarchyPath(talk, flatArr) {
        for (let i = talk.path.length - 1; i >= 1; i--) {
            const subTalk = flatArr[talk.path[i]];
            const parent = flatArr[talk.path[i - 1]];
            if (!parent.items.includes(subTalk)) {
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
            });
        });
    }
    static removeUserFromGroup(userID, talkID) {
        return __awaiter(this, void 0, void 0, function* () {
            return DAL.UsersTalks.removeUserFromTalk(talkID, userID);
        });
    }
}
exports.default = UsersGroups;
//# sourceMappingURL=usersgroups.js.map