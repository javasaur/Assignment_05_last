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
const Joi = require("joi");
class Users {
    static addUserToGroupRelation(userID, groupID) {
        return __awaiter(this, void 0, void 0, function* () {
            return usersdb_1.default.getInstance().addUserToGroupRelation(userID, groupID);
        });
    }
    static addUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                name: Joi.string().min(3).max(15).required().error(new Error(`Username should be between 3 and 15 characters`)),
                password: Joi.string().min(6).max(32).required().error(new Error(`Password should be between 6 and 32 characters`)),
                age: Joi.number().greater(17).error(new Error(`You must be at least 18 years old`))
            });
            //
            Joi.validate({ name: user.name, password: user.password, age: user.age }, schema, function (err) {
                if (err) {
                    throw err;
                }
            });
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
    static getPrivateGroupsIDs(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            return usersdb_1.default.getInstance().getPrivateGroupsIDs(userID).catch(helpers_1.rethrow);
        });
    }
    static getUsersByIDs(usersIDs) {
        return __awaiter(this, void 0, void 0, function* () {
            return usersdb_1.default.getInstance().getUsersByIds(usersIDs).catch(helpers_1.rethrow);
        });
    }
    static updateUser(userID, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                name: Joi.string().min(3).max(15).required().error(new Error(`Username should be between 3 and 15 characters`)),
                // password: Joi.string().min(6).max(32).required().error(new Error(`Password should be between 6 and 32 characters`)),
                age: Joi.number().greater(17).error(new Error(`You must be at least 18 years old`))
            });
            Joi.validate({ name: user.name, age: user.age }, schema, function (err) {
                if (err) {
                    throw err;
                }
            });
            return usersdb_1.default.getInstance().updateUser(userID, user);
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