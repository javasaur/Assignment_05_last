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
const usersdb_1 = require("../lib/usersdb");
const helpers_1 = require("../util/helpers");
class Users {
    static addUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return usersdb_1.default.getInstance().addUser(user).catch(helpers_1.rethrow);
        });
    }
    static getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return usersdb_1.default.getInstance().getAllUsers().catch(helpers_1.rethrow);
        });
    }
    static getAssociatedGroupsIDs(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            return usersdb_1.default.getInstance().getAssociatedGroupsIDs(userID).catch(helpers_1.rethrow);
        });
    }
    static getUserByID(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            return usersdb_1.default.getInstance().getUserByID(userID).catch(helpers_1.rethrow);
        });
    }
    static getUsersByIDs(usersIDs) {
        return __awaiter(this, void 0, void 0, function* () {
            return usersdb_1.default.getInstance().getUsersByIds(usersIDs).catch(helpers_1.rethrow);
        });
    }
    static updateUser(userID, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return usersdb_1.default.getInstance().updateUser(userID, user).catch(helpers_1.rethrow);
        });
    }
    static removeUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return usersdb_1.default.getInstance().removeUser(userId).catch(helpers_1.rethrow);
        });
    }
}
exports.default = Users;
//# sourceMappingURL=users.js.map