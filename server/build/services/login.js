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
const hash_1 = require("../services/hash");
const usersdb_1 = require("../lib/usersdb");
class Login {
    static checkMatch(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield usersdb_1.default.getInstance().getUserByName(username);
            const userHash = user.password;
            const compare = yield hash_1.default.compare(password, userHash);
            return compare ? { accessAllowed: true, id: user.id } : { accessAllowed: false };
        });
    }
}
exports.default = Login;
//# sourceMappingURL=login.js.map