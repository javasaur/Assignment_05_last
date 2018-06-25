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
const fs = require("fs");
class DB {
    static readFromStore(storePath) {
        return new Promise((resolve, reject) => {
            fs.readFile(storePath, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(JSON.parse(data));
                }
            });
        });
    }
    static writeToStore(storePath, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                fs.writeFile(storePath, data, 'utf8', (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            });
        });
    }
}
DB.USERS_STORE = `${__dirname}\\..\\..\\stores\\users.json`;
DB.USERS_TO_DIALOGUES_STORE = `${__dirname}\\..\\..\\stores\\userstodialogues.json`;
DB.GROUPS_STORE = `${__dirname}\\..\\..\\stores\\groups.json`;
DB.SESSIONS_STORE = `${__dirname}\\..\\..\\stores\\sessions.json`;
DB.MESSAGES_STORE = `${__dirname}\\..\\..\\stores\\messages.json`;
exports.default = DB;
//# sourceMappingURL=db.js.map