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
const groups_1 = require("./groups");
const users_1 = require("./users");
const DAL = require("../lib/dal");
const CustomError_1 = require("../lib/CustomError");
class UsersGroups {
    static addUserToGroup(userID, groupID) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield DAL.Talks.hasSubtalks(groupID)) {
                throw new CustomError_1.default(`Can't add user to group, which contains subgroups`);
            }
            return DAL.UsersTalks.addUserToTalk(userID, groupID);
        });
    }
    static getAssociatedGroups(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const groupIDs = yield users_1.default.getAssociatedGroupsIDs(userID);
                const groups = yield groups_1.default.getGroupsByIDs(groupIDs);
                return groups;
            }
            catch (err) {
                throw new Error(`Failed to get associated groups: ${err.message}`);
            }
        });
    }
    static getPrivateGroups(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const privateGroupsIDs = yield users_1.default.getPrivateGroupsIDs(userID);
                let privateGroups;
                if (privateGroupsIDs) {
                    // privateGroupsIDs can be void?!!
                    privateGroups = yield groups_1.default.getGroupsByIDs(privateGroupsIDs);
                }
                return privateGroups || [];
            }
            catch (err) {
                throw new Error(`Failed to get private groups for ${userID}: ${err.message}`);
            }
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
                const publicGroups = yield groups_1.default.getPublicRootGroups();
                const spreadGroups = [];
                if (!publicGroups)
                    return;
                publicGroups.forEach(g => spreadGroups.push(Object.assign({}, g)));
                if (spreadGroups) {
                    console.log(spreadGroups);
                    for (let group of spreadGroups) {
                        yield UsersGroups.decomposeAdminGroup(group);
                    }
                }
                return spreadGroups;
            }
            catch (err) {
                throw new Error(`Failed to build admin JSON tree: ${err.message}`);
            }
        });
    }
    static buildJSONTree(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const publicGroups = yield groups_1.default.getPublicRootGroups();
                const privateGroups = yield this.getPrivateGroups(userID);
                if (!publicGroups)
                    return [];
                const groups = [...publicGroups].concat([...privateGroups]);
                const spreadGroups = [];
                groups.forEach(g => spreadGroups.push(Object.assign({}, g)));
                if (spreadGroups) {
                    for (let group of spreadGroups) {
                        yield UsersGroups.decomposeGroup(group, userID);
                    }
                }
                return spreadGroups;
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
    static decomposeAdminGroup(group) {
        return __awaiter(this, void 0, void 0, function* () {
            group.items = [];
            if (group.groups.length > 0) {
                for (let subgroupID of group.groups) {
                    const subgroup = yield groups_1.default.getGroupByID(subgroupID);
                    group.items.push(subgroup);
                    UsersGroups.decomposeAdminGroup(subgroup);
                }
            }
        });
    }
    static decomposeGroup(group, userID) {
        return __awaiter(this, void 0, void 0, function* () {
            group.items = [];
            if (group.name === 'PM') {
                const id = yield groups_1.default.getSecondCompanionID(group.id, userID + '');
                const user = yield users_1.default.getUserByID(id);
                group.name = user.name;
                group.type = 'user';
                return;
            }
            if (group.groups.length > 0) {
                for (let subgroupID of group.groups) {
                    const subgroup = yield groups_1.default.getGroupByID(subgroupID);
                    group.items.push(subgroup);
                    UsersGroups.decomposeGroup(subgroup, userID);
                }
            }
            const users = yield users_1.default.getUsersByIDs(group.users);
            if (users && users.length > 0) {
                console.log(users);
                for (let user of users) {
                    user.id = Math.min(userID, user.id) + '_' + Math.max(userID, user.id);
                }
                group.items.push(...users);
            }
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