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
const usersdb_1 = require("../lib/usersdb");
class UsersGroups {
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
    static buildJSONTree(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const publicGroups = yield groups_1.default.getPublicGroups();
                const privateGroups = yield this.getPrivateGroups(userID);
                if (!publicGroups)
                    return [];
                const groups = [...publicGroups].concat([...privateGroups]);
                const spreadGroups = [];
                groups.forEach(g => spreadGroups.push(Object.assign({}, g)));
                if (spreadGroups) {
                    for (let group of spreadGroups) {
                        if (group.name === 'PM') {
                            const id = yield groups_1.default.getSecondCompanionID(group.id, userID + '');
                            const user = yield users_1.default.getUserByID(id);
                            group.name = user.name;
                            group.type = 'user';
                        }
                        const items = yield users_1.default.getUsersByIDs(group.items);
                        if (items) {
                            for (let item of items) {
                                item.id = Math.min(userID, item.id) + '_' + Math.max(userID, item.id);
                            }
                        }
                        group.items = items;
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
            try {
                yield usersdb_1.default.getInstance().removeUser(id);
                // await UsersDB.getInstance().removeUserToDialoguesLinks(id);
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = UsersGroups;
//# sourceMappingURL=usersgroups.js.map