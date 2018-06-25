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
const services = require("../services");
0;
class Users {
    static addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            services.Users.addUser(req.body)
                .then(() => res.status(200).send({})) // should return boolean?
                .catch(err => {
                res.status(400).json({ error: err.message });
            });
        });
    }
    static getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            services.Users.getAllUsers()
                .then(users => res.status(200).json(users))
                .catch(err => res.status(400).json({ error: err.message }));
        });
    }
    static getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            services.Users.getUserByID(req.params.id)
                .then(user => res.status(200).json(user))
                .catch(err => res.status(400).send(err.message));
        });
    }
    static updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            services.Users.updateUser(req.params.id, req.body)
                .then(() => res.status(200).send({}))
                .catch(err => res.status(400).json({ error: err.message }));
        });
    }
    static removeUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            services.Users.removeUser(req.params.id)
                .then(() => res.status(200).send({}))
                .catch(err => res.status(400).json({ error: err.message }));
        });
    }
}
exports.default = Users;
//# sourceMappingURL=users.js.map