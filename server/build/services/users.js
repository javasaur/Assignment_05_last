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
const hash_1 = require("./hash");
const Joi = require("joi");
const DAL = require("../lib/dal");
const CustomError_1 = require("../helpers/CustomError");
const common_1 = require("../helpers/common");
const db_1 = require("../helpers/db");
class Users {
    static addUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validation
                const schema = Joi.object().keys({
                    name: Joi.string().min(3).max(15).required()
                        .error(new CustomError_1.default(`Username should be between 3 and 15 characters`)),
                    password: Joi.string().min(6).max(32).required()
                        .error(new CustomError_1.default(`Password should be between 6 and 32 characters`)),
                    age: Joi.number().greater(17)
                        .error(new CustomError_1.default(`You must be at least 18 years old`))
                });
                Joi.validate({ name: user.name, password: user.password, age: user.age }, schema, function (err) {
                    if (err) {
                        throw err;
                    }
                });
                if (yield DAL.Users.existsUserWithName(user.name)) {
                    throw new CustomError_1.default(`Username ${user.name} is busy `);
                }
                // Hashing
                const hash = yield hash_1.default.hash(user.password);
                user.password = hash;
                return yield DAL.Users.addUser(user).execute();
            }
            catch (err) {
                err instanceof CustomError_1.default ? common_1._throw(err) : common_1.logAndThrow(err, db_1.DEFAULT_SQL_ERROR);
            }
        });
    }
    static getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield DAL.Users.getAllUsers('no-password').execute();
            }
            catch (err) {
                common_1.logAndThrow(err, db_1.DEFAULT_SQL_ERROR);
            }
        });
    }
    static getUserByID(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield DAL.Users.getUserByID(userID).execute();
            }
            catch (err) {
                common_1.logAndThrow(err, db_1.DEFAULT_SQL_ERROR);
            }
        });
    }
    static updateUser(userID, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object().keys({
                    name: Joi.string().min(3).max(15).required().error(new CustomError_1.default(`Username should be between 3 and 15 characters`)),
                    // password: Joi.string().min(6).max(32).required().error(new Error(`Password should be between 6 and 32 characters`)),
                    age: Joi.number().greater(17).error(new CustomError_1.default(`You must be at least 18 years old`))
                });
                Joi.validate({ name: user.name, age: user.age }, schema, function (err) {
                    if (err) {
                        throw err;
                    }
                });
                user.id = userID;
                return yield DAL.Users.updateUser(user).execute();
            }
            catch (err) {
                err instanceof CustomError_1.default ? common_1._throw(err) : common_1.logAndThrow(err, db_1.DEFAULT_SQL_ERROR);
            }
        });
    }
}
exports.default = Users;
//# sourceMappingURL=users.js.map