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
const groupsdb_1 = require("../lib/groupsdb");
const helpers_1 = require("../util/helpers");
const DAL = require("../lib/dal");
class Groups {
    static addUserToGroup(userID, groupID) {
        return __awaiter(this, void 0, void 0, function* () {
            return groupsdb_1.default.getInstance().addUser(userID, groupID);
        });
    }
    static addRootGroup(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return DAL.Talks.addPublicRootTalk(name);
        });
    }
    static addGroupUnderParent(name, parentID) {
        return __awaiter(this, void 0, void 0, function* () {
            return DAL.Talks.addPublicSubtalk(name, parentID);
        });
    }
    static getAllGroups() {
        return __awaiter(this, void 0, void 0, function* () {
            return groupsdb_1.default.getInstance().getAllGroups().catch(helpers_1.rethrow);
        });
    }
    static getSecondCompanionID(groupID, firstCompanionID) {
        return __awaiter(this, void 0, void 0, function* () {
            return groupsdb_1.default.getInstance().getSecondCompanionID(groupID, firstCompanionID).catch(helpers_1.rethrow);
        });
    }
    static getGroupByID(groupdID) {
        return __awaiter(this, void 0, void 0, function* () {
            return groupsdb_1.default.getInstance().getGroupByID(groupdID).catch(helpers_1.rethrow);
        });
    }
    static getPublicGroups() {
        return __awaiter(this, void 0, void 0, function* () {
            return groupsdb_1.default.getInstance().getPublicGroups(null).catch(helpers_1.rethrow);
        });
    }
    static getPublicRootGroups() {
        return __awaiter(this, void 0, void 0, function* () {
            return groupsdb_1.default.getInstance().getPublicGroups('root').catch(helpers_1.rethrow);
        });
    }
    static getGroupsByIDs(groupsIDs) {
        return __awaiter(this, void 0, void 0, function* () {
            return groupsdb_1.default.getInstance().getGroupsByIDs(groupsIDs).catch(helpers_1.rethrow);
        });
    }
    static removeUserFromGroup(userID, groupID) {
        return __awaiter(this, void 0, void 0, function* () {
            return groupsdb_1.default.getInstance().removeUser(userID, groupID);
        });
    }
}
exports.default = Groups;
//# sourceMappingURL=groups.js.map