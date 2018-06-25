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
class Groups {
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
    static getGroupsByIDs(groupsIDs) {
        return __awaiter(this, void 0, void 0, function* () {
            return groupsdb_1.default.getInstance().getGroupsByIDs(groupsIDs).catch(helpers_1.rethrow);
        });
    }
}
exports.default = Groups;
//# sourceMappingURL=groups.js.map